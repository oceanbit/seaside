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
  nativeId: string;
  eventFunctionCallback: () => void;
}

export function checkEvent({
  eventName,
  eventFunction,
  eventFunctionCallback,
  nativeId,
}: CheckEventProps) {
  if (eventFunction && typeof eventFunction === "function") {
    eventFunctionCallback();
    return;
  }
  if (canUseDOM()) {
    const toggle = new Event(eventName);
    const el = document.querySelector("#" + nativeId);
    el && el.parentElement!.dispatchEvent(toggle);
  }
}

type UpstreamPressableProps = ComponentProps<typeof Pressable>;

type NoCallbackStyle = Exclude<UpstreamPressableProps["style"], Function>;

interface AccessibleTouchableBaseProps {
  eventName: string;
  eventFunction: Function | undefined;
  idPrepend: string;
  focusedStyle: NoCallbackStyle;
  pressedStyle: NoCallbackStyle;
  hoveredStyle: NoCallbackStyle;
  style: NoCallbackStyle;
}

type AccessibleTouchableProps = AccessibleTouchableBaseProps &
  Omit<UpstreamPressableProps, "onPressIn" | "onPressOut" | "style">;

export const useCondition = (initial: boolean) => {
  const [condition, setCondition] = useState(initial);
  const onActivate = () => setCondition(true);
  const onDeactivate = () => setCondition(false);

  return [condition, onActivate, onDeactivate] as const;
};

export const AccessiblePressable: FC<AccessibleTouchableProps> = ({
  children,
  eventName,
  eventFunction,
  idPrepend,
  onPress: propOnPress,
  style,
  focusedStyle,
  pressedStyle,
  hoveredStyle,
  accessibilityRole = "button",
  ...pressableProps
}) => {
  const _pressableId = useId();
  const pressableId = useMemo(
    () => `${idPrepend}${_pressableId}`,
    [idPrepend, _pressableId]
  );

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
      if (pressableProps.disabled) return;
      checkEvent({
        eventName,
        eventFunction,
        nativeId: pressableId,
        eventFunctionCallback: () => propOnPress(e),
      });
    },
    [
      propOnPress,
      eventName,
      eventFunction,
      pressableId,
      pressableProps.disabled,
    ]
  );

  useLayoutEffect(() => {
    if (canUseDOM()) {
      const el = document.querySelector<HTMLElement>("#" + pressableId);
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
  }, [pressableId, onPress]);

  // Not supported by React Native, but is supported by both RNWs;
  const hoverProps = {
    onMouseEnter,
    onMouseLeave,
  } as {};

  return (
    <Pressable
      {...pressableProps}
      {...hoverProps}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onFocus={onFocus}
      onBlur={onBlur}
      style={mergedStyle}
      nativeID={pressableId}
      accessibilityRole={accessibilityRole}
    >
      {children}
    </Pressable>
  );
};
