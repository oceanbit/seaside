import {
  GestureResponderEvent,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ComponentProps, useMemo, useState, FC } from "react";
import { useId } from "@reach/auto-id";

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
  if (typeof window !== "undefined") {
    const toggle = new Event(eventName);
    const el = document.querySelector("#" + viewId);
    el && el.parentElement!.dispatchEvent(toggle);
  }
}

interface AccessibleTouchableBaseProps {
  eventName: string;
  eventFunction: Function | undefined;
  idPrepend: string;
}

type AccessibleTouchableProps = AccessibleTouchableBaseProps &
  Omit<
    ComponentProps<typeof TouchableWithoutFeedback>,
    "onPressIn" | "onPressOut"
  >;

export const AccessibleTouchable: FC<AccessibleTouchableProps> = ({
  children,
  eventName,
  eventFunction,
  idPrepend,
  onPress: propOnPress,
  ...viewProps
}) => {
  const _viewId = useId();
  const viewId = useMemo(() => `${idPrepend}${_viewId}`, [idPrepend, _viewId]);

  const [pressed, setPressed] = useState(false);
  const onPressIn = () => setPressed(true);
  const onPressOut = () => setPressed(false);

  const [focus, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

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
        {...viewProps}
      >
        {children}
      </TouchableWithoutFeedback>
    </View>
  );
};
