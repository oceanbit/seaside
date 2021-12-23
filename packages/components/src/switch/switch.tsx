import * as React from "react";
import { View, TouchableWithoutFeedback, Animated } from "react-native";
import { theme } from "../constants/theme";
import { DynamicStyleSheet, useDynamicValue } from "react-native-dynamic";
import { useId } from "@reach/auto-id";
import { colors } from "seaside-tokens/colors";
import { useState } from "react";
import { AccessibleTouchable } from "../accessible-touchable";

export interface SeaSwitchProps {
  enabled: boolean;
  disabled?: boolean;
  onToggle?: (val: boolean) => void;
  label?: string;
}

const animTiming = 150;

export const Switch = ({
  enabled,
  onToggle,
  disabled,
  label,
}: SeaSwitchProps) => {
  const styles = useDynamicValue(dynamicStyles);

  const primary = useDynamicValue<string>(theme.colors.primary);
  const off_background = useDynamicValue<string>(theme.colors.tint_neutral_01);
  const disabled_background = useDynamicValue<string>(
    theme.colors.tint_neutral_02
  );
  const thumb_disabled_background = useDynamicValue<string>(
    theme.colors.tint_neutral_02
  );

  const [switchLeft] = React.useState(new Animated.Value(0));
  const [thumbDisabled] = React.useState(new Animated.Value(0));

  const [switchPrimaryBG] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (disabled) {
      Animated.timing(thumbDisabled, {
        toValue: 1,
        duration: animTiming,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(thumbDisabled, {
        toValue: 0,
        duration: animTiming,
        useNativeDriver: true,
      }).start();
    }

    if (enabled) {
      Animated.parallel([
        Animated.timing(switchLeft, {
          toValue: theme.spacing.m + theme.spacing.xxs, // Width of switch
          duration: animTiming,
          useNativeDriver: true,
        }),
        Animated.timing(switchPrimaryBG, {
          toValue: disabled ? 0 : 2,
          duration: animTiming,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(switchLeft, {
          toValue: 0 + theme.spacing.xxs,
          duration: animTiming,
          useNativeDriver: true,
        }),
        Animated.timing(switchPrimaryBG, {
          toValue: disabled ? 0 : 1,
          duration: animTiming,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [switchLeft, enabled, switchPrimaryBG, thumbDisabled, disabled]);

  const thumbBGColor = thumbDisabled.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.white, thumb_disabled_background],
  });

  const onPress = () => {
    onToggle && onToggle(!enabled);
  };

  const trackBGColor = switchPrimaryBG.interpolate({
    // These interpolated values must be in this order, otherwise, when transitioning from "enabled" to "disabled",
    // the colors will flash in a weird/bad order
    inputRange: [0, 1, 2],
    outputRange: [disabled_background, off_background, primary],
  });

  const thumbAnim = {
    left: switchLeft,
    backgroundColor: thumbBGColor,
  };

  const switchTrackBG = {
    backgroundColor: trackBGColor,
  };

  return (
    <AccessibleTouchable
      accessibilityRole={"switch"}
      accessibilityState={{
        disabled: disabled,
        selected: enabled,
      }}
      disabled={disabled}
      idPrepend={"seaswitch_"}
      testID={"switch"}
      eventFunction={onToggle}
      eventName={"toggle"}
      onPress={onPress}
      style={styles.switchBox}
      focusStyle={{}}
      pressedStyle={{}}
      webStyle={{ cursor: "pointer", display: "inline-block" }}
      {...(label ? { accessibilityLabel: label } : {})}
    >
      <Animated.View style={[styles.switchTrack, switchTrackBG]}>
        <Animated.View style={[styles.switchThumb, thumbAnim]} />
      </Animated.View>
    </AccessibleTouchable>
  );
};

export const SwitchWatchedAttributes = [
  "enabled",
  "disabled",
  "label",
] as Array<keyof SeaSwitchProps>;

const dynamicStyles = new DynamicStyleSheet({
  switchBox: {
    paddingHorizontal: theme.spacing.xxs,
    paddingVertical: theme.spacing.s,
  },
  switchTrack: {
    padding: theme.spacing.xxs,
    width: theme.spacing.m * 2,
    height: theme.spacing.m,
    position: "relative",
    backgroundColor: theme.colors.tint_neutral_02,
    boxSizing: "content-box",
    borderRadius: theme.spacing.m,
  },
  switchThumb: {
    position: "absolute",
    width: theme.spacing.m,
    height: theme.spacing.m,
    left: theme.spacing.xxs,
    top: theme.spacing.xxs,
    borderRadius: theme.spacing.m,
  },
});
