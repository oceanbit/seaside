import {
  GestureResponderEvent,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { ComponentProps, useMemo, FC, useCallback, useState } from "react";
import { useId } from "@reach/auto-id";
import { useIsomorphicLayoutEffect as useLayoutEffect } from "../utils/use-isomorphic-layout-effect";
import { canUseDOM } from "../utils/can-use-dom";

interface CheckEventProps {
  eventName: string;
  eventFunction: Function | undefined;
  viewId: string;
  eventFunctionCallback: () => void;
}

export function checkEvent({
  eventName,
  eventFunction,
  eventFunctionCallback,
  viewId,
}: CheckEventProps) {
  if (eventFunction && typeof eventFunction === "function") {
    eventFunctionCallback();
    return;
  }
  if (canUseDOM()) {
    const toggle = new Event(eventName);
    const el = document.querySelector("#" + viewId);
    el && el.parentElement!.dispatchEvent(toggle);
  }
}

type UpstreamTouchableProps = ComponentProps<typeof TouchableWithoutFeedback>;

interface AccessibleTouchableBaseProps {
  eventName: string;
  eventFunction: Function | undefined;
  idPrepend: string;
  focusedStyle: UpstreamTouchableProps["style"];
  pressedStyle: UpstreamTouchableProps["style"];
  hoveredStyle: UpstreamTouchableProps["style"];
}

type AccessibleTouchableProps = AccessibleTouchableBaseProps &
  Omit<UpstreamTouchableProps, "onPressIn" | "onPressOut">;

export const useCondition = (initial: boolean) => {
  const [condition, setCondition] = useState(initial);
  const onActivate = () => setCondition(true);
  const onDeactivate = () => setCondition(false);

  return [condition, onActivate, onDeactivate] as const;
};

export const AccessibleTouchable: FC<AccessibleTouchableProps> = ({
  children,
  eventName,
  eventFunction,
  idPrepend,
  onPress: propOnPress,
  style,
  focusedStyle,
  pressedStyle,
  hoveredStyle,
  ...viewProps
}) => {
  const _viewId = useId();
  const viewId = useMemo(() => `${idPrepend}${_viewId}`, [idPrepend, _viewId]);

  const [pressed, onPressIn, onPressOut] = useCondition(false);

  const [focused, onFocus, onBlur] = useCondition(false);

  const [hovered, onMouseEnter, onMouseLeave] = useCondition(false);

  const mergedStyle = useMemo(
    () => [
      style ? style : {},
      hovered ? hoveredStyle : {},
      focused ? focusedStyle : {},
      pressed ? pressedStyle : {},
    ],
    [style, focused, focusedStyle, pressed, pressedStyle, hovered, hoveredStyle]
  );

  const onPress = useCallback(
    (e: GestureResponderEvent) => {
      if (!propOnPress) return;
      if (viewProps.disabled) return;
      checkEvent({
        eventName,
        eventFunction,
        viewId,
        eventFunctionCallback: () => propOnPress(e),
      });
    },
    [propOnPress, eventName, eventFunction, viewId, viewProps.disabled]
  );

  useLayoutEffect(() => {
    if (canUseDOM()) {
      const el = document.querySelector<HTMLElement>("#" + viewId);
      if (!el) return;
      function onPressLocal(e: KeyboardEvent) {
        if (e.code === "Space") {
          e.preventDefault();
          onPress(e as any);
        }
      }
      el.addEventListener("keydown", onPressLocal);
      return () => el.removeEventListener("keydown", onPressLocal);
    }
  }, [viewId, onPress]);

  // Not supported by React Native, but is supported by both RNWs;
  const hoverProps = {
    onMouseEnter,
    onMouseLeave,
  } as {};

  return (
    <Pressable
      {...viewProps}
      {...hoverProps}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onFocus={onFocus}
      onBlur={onBlur}
      style={mergedStyle}
      nativeID={viewId}
    >
      {children}
    </Pressable>
  );
};
