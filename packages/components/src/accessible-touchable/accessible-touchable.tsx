import {
  GestureResponderEvent,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ComponentProps, useMemo, FC, useCallback } from "react";
import { useId } from "@reach/auto-id";
import { useIsomorphicLayoutEffect as useLayoutEffect } from "../utils/use-isomorphic-layout-effect";
import { canUseDOM } from "../utils/can-use-dom";
import { useWebStyling } from "./use-web-styling";

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

export type WebStyle = Readonly<Partial<HTMLElement["style"]>>;

interface AccessibleTouchableBaseProps {
  eventName: string;
  eventFunction: Function | undefined;
  idPrepend: string;
  focusedStyle: UpstreamTouchableProps["style"];
  pressedStyle: UpstreamTouchableProps["style"];
  // Styling only for the web, using normal CSS properties
  webStyle?: WebStyle;
  focusedWebStyle?: WebStyle;
  pressedWebStyle?: WebStyle;
}

type AccessibleTouchableProps = AccessibleTouchableBaseProps &
  Omit<UpstreamTouchableProps, "onPressIn" | "onPressOut">;

export const AccessibleTouchable: FC<AccessibleTouchableProps> = ({
  children,
  eventName,
  eventFunction,
  idPrepend,
  onPress: propOnPress,
  style,
  focusedStyle,
  pressedStyle,
  webStyle,
  focusedWebStyle,
  pressedWebStyle,
  ...viewProps
}) => {
  const _viewId = useId();
  const viewId = useMemo(() => `${idPrepend}${_viewId}`, [idPrepend, _viewId]);

  const [pressed, onPressIn, onPressOut] = useWebStyling({
    webStyle: pressedWebStyle,
    viewId,
  });

  const [focused, onFocus, onBlur] = useWebStyling({
    webStyle: focusedWebStyle,
    viewId,
  });

  const mergedStyle = useMemo(
    () => ({
      ...((style || {}) as ViewStyle),
      ...(((focused && focusedStyle) || {}) as ViewStyle),
      ...(((pressed && pressedStyle) || {}) as ViewStyle),
    }),
    [pressedStyle, focusedStyle, style, focused, pressed]
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
      Object.assign(el.style, webStyle);
      function onPressLocal(e: KeyboardEvent) {
        if (e.code === "Space") {
          e.preventDefault();
          onPress(e as any);
        }
      }
      el.addEventListener("keydown", onPressLocal);
      return () => el.removeEventListener("keydown", onPressLocal);
    }
  }, [viewId, webStyle, onPress]);

  return (
    <View nativeID={viewId}>
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onFocus={onFocus}
        onBlur={onBlur}
        style={mergedStyle}
        {...viewProps}
      >
        {children}
      </Pressable>
    </View>
  );
};
