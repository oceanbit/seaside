import {
  GestureResponderEvent,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { ComponentProps, useMemo, useState, FC } from "react";
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

export type WebStyle = Readonly<Partial<HTMLElement["style"]>>;

interface AccessibleTouchableBaseProps {
  eventName: string;
  eventFunction: Function | undefined;
  idPrepend: string;
  focusStyle: UpstreamTouchableProps["style"];
  pressedStyle: UpstreamTouchableProps["style"];
  webStyle: WebStyle;
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
  focusStyle,
  pressedStyle,
  webStyle,
  ...viewProps
}) => {
  const _viewId = useId();
  const viewId = useMemo(() => `${idPrepend}${_viewId}`, [idPrepend, _viewId]);

  const [pressed, setPressed] = useState(false);
  const onPressIn = () => setPressed(true);
  const onPressOut = () => setPressed(false);

  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const mergedStyle = useMemo(
    () => ({
      ...((style || {}) as ViewStyle),
      ...(((focused && focusStyle) || {}) as ViewStyle),
      ...(((pressed && pressedStyle) || {}) as ViewStyle),
    }),
    [pressedStyle, focusStyle, style, focused, pressed]
  );

  useLayoutEffect(() => {
    if (canUseDOM()) {
      const el = document.querySelector<HTMLElement>("#" + viewId);
      if (!el) return;
      for (const key of Object.keys(webStyle)) {
        // Hush little TypeScript, don't you cry
        // Corbin's gonna code you a lullaby
        //
        // ...
        //
        // For all the webStyle's keys and all the key's values
        // could all be assigned to el.style again
        //
        // Goodnight, sweet code.
        const keyLocal: "color" = key as never;
        el.style[keyLocal] = webStyle[keyLocal]!;
      }
    }
  }, [viewId, webStyle]);

  const onPress = (e: GestureResponderEvent) => {
    if (!propOnPress) return;
    if (viewProps.disabled) return;
    checkEvent({
      eventName,
      eventFunction,
      viewId,
      eventFunctionCallback: () => propOnPress(e),
    });
  };

  return (
    <View nativeID={viewId}>
      <TouchableWithoutFeedback
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onFocus={onFocus}
        onBlur={onBlur}
        style={mergedStyle}
        {...viewProps}
      >
        {children}
      </TouchableWithoutFeedback>
    </View>
  );
};
