import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextProps,
  View,
  Animated,
} from "react-native";
import { theme } from "../constants/theme";
import {
  DynamicStyleSheet,
  useDarkModeValue,
  useDynamicStyleSheet,
} from "@seaside/stylesheet";
import { useId } from "@reach/auto-id";
import { useEffect, useMemo, useState } from "react";
// import {SharkIconButton} from '../shark-icon-button';

export interface TextInputProps {
  ellipsizeMode?: TextProps["ellipsizeMode"];
  value: RNTextInputProps["value"];
  onChangeText: RNTextInputProps["onChangeText"];
  disabled?: boolean;
  errorStr?: string;
  keyboardType?: RNTextInputProps["keyboardType"];
  endIcon?: string;
}

const animTiming = 150;

export const TextInput = ({
  value,
  onChangeText,
  disabled,
  errorStr,
  keyboardType,
  endIcon,
}: TextInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const styles = useDynamicStyleSheet(dynamicStyles);

  const primary = useDarkModeValue(theme.colors.primary);
  const label_high_emphasis = useDarkModeValue(
    theme.colors.label_high_emphasis
  );

  const disabled_background_color = useDarkModeValue(
    theme.colors.tint_neutral_02
  );
  const disabled_border_color = useDarkModeValue(theme.colors.tint_neutral_01);
  const label_low_emphasis = useDarkModeValue(theme.colors.label_low_emphasis);

  const [coloredBgOpacity] = useState(new Animated.Value(0));
  const [labelTextToken] = useState(new Animated.Value(1));
  const [grayBorderOpacity] = useState(new Animated.Value(1));
  const [coloredBgHeight] = useState(new Animated.Value(0));
  const [textInputHeight, setInputHeight] = useState(0);
  const [labelInputContHeight, setLabelInputContHeight] = useState(0);
  const [labelLeft] = useState(new Animated.Value(theme.spacing.xxs));
  const [labelBottom] = useState(new Animated.Value(theme.spacing.xxs));
  const [labelTop] = useState(new Animated.Value(theme.spacing.xxs));
  const [disabledToken] = useState(new Animated.Value(0));

  const _textId = useId();
  const textId = useMemo(() => `seatext_internal_${_textId}`, [_textId]);

  useEffect(() => {
    if (disabled) {
      Animated.timing(disabledToken, {
        toValue: 1,
        duration: animTiming,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(disabledToken, {
        toValue: 0,
        duration: animTiming,
        useNativeDriver: true,
      }).start();
    }
    if (isFocused && !disabled) {
      Animated.parallel([
        Animated.timing(coloredBgOpacity, {
          toValue: 1,
          duration: animTiming,
          useNativeDriver: true,
        }),
        Animated.timing(labelTextToken, {
          toValue: 2,
          duration: animTiming,
          useNativeDriver: true,
        }),
        Animated.timing(grayBorderOpacity, {
          toValue: 0,
          duration: animTiming,
          useNativeDriver: true,
        }),
        Animated.timing(coloredBgHeight, {
          toValue: labelInputContHeight,
          duration: animTiming,
          useNativeDriver: true,
        }),
        Animated.timing(labelLeft, {
          toValue: theme.spacing.s,
          duration: animTiming,
          useNativeDriver: true,
        }),

        Animated.timing(labelTop, {
          toValue: theme.spacing.xs,
          duration: animTiming,
          useNativeDriver: true,
        }),
        Animated.timing(labelBottom, {
          toValue: 0,
          duration: animTiming,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(coloredBgOpacity, {
          toValue: 0,
          duration: animTiming,
          useNativeDriver: true,
        }),
        Animated.timing(labelTextToken, {
          toValue: disabled ? 0 : 1,
          duration: animTiming,
          useNativeDriver: true,
        }),
        Animated.timing(grayBorderOpacity, {
          /**
           * We're doing some weird things with the gray border.
           * What we should do is migrate to tint_32 and not change opacity to disabled
           */
          toValue: disabled ? 1 : theme.opacity.disabled,
          duration: animTiming,
          useNativeDriver: true,
        }),
        Animated.timing(coloredBgHeight, {
          toValue: textInputHeight,
          duration: animTiming,
          useNativeDriver: true,
        }),
        Animated.timing(labelLeft, {
          toValue: theme.spacing.xxs,
          duration: animTiming,
          useNativeDriver: true,
        }),
        Animated.timing(labelTop, {
          toValue: theme.spacing.xxs,
          duration: animTiming,
          useNativeDriver: true,
        }),
        Animated.timing(labelBottom, {
          toValue: theme.spacing.xxs,
          duration: animTiming,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [
    isFocused,
    grayBorderOpacity,
    coloredBgOpacity,
    coloredBgHeight,
    textInputHeight,
    labelInputContHeight,
    labelLeft,
    labelTop,
    labelBottom,
    disabledToken,
    disabled,
    labelTextToken,
  ]);

  useEffect(() => {
    // Remove `outline` styling on browser
    if (typeof window !== "undefined") {
      const el = document.querySelector("#" + textId) as HTMLElement;
      if (!el) return;
      el.style.outline = "none";
    }
  }, [textId]);

  const coloredBackgroundStyle = {
    opacity: coloredBgOpacity,
    height: coloredBgHeight,
  };

  const grayBorderColor = disabledToken.interpolate({
    inputRange: [0, 1],
    outputRange: [label_high_emphasis, disabled_border_color],
  });

  const greyBorderStyle = {
    opacity: grayBorderOpacity,
    height: coloredBgHeight,
    borderColor: grayBorderColor,
  };

  const coloredBorderStyle = {
    opacity: coloredBgOpacity,
  };

  // We need to add a disabled state
  const labelTextColor = labelTextToken.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [label_low_emphasis, label_high_emphasis, primary],
  });

  const disabledBG = disabledToken.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", disabled_background_color],
  });

  const labelTextStyles = {
    color: labelTextColor,
  };

  const labelContainer = {
    paddingHorizontal: labelLeft,
    paddingTop: labelTop,
    paddingBottom: labelBottom,
  };

  const inputStylingWithIcon = !!endIcon
    ? { paddingRight: theme.spacing.xxs }
    : {};

  const disabledBackground = {
    backgroundColor: disabledBG,
  };

  return (
    <>
      <View
        style={styles.inputLabelContainer}
        onLayout={(event) => {
          const { height: eventHeight } = event.nativeEvent.layout;
          setLabelInputContHeight(eventHeight);
        }}
      >
        <Animated.View style={labelContainer}>
          <Animated.Text style={[styles.label, labelTextStyles]}>
            Label
          </Animated.Text>
        </Animated.View>
        <Animated.View
          style={[styles.textInpContainer, disabledBackground]}
          onLayout={(event) => {
            const { height: eventHeight } = event.nativeEvent.layout;
            setInputHeight(eventHeight);
          }}
        >
          <RNTextInput
            nativeID={textId}
            value={value}
            onChangeText={onChangeText}
            placeholder={""}
            style={[styles.textInput, inputStylingWithIcon]}
            numberOfLines={1}
            multiline={false}
            editable={!disabled}
            keyboardType={keyboardType}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {/*{!!endIcon && (*/}
          {/*  <SharkIconButton*/}
          {/*    onPress={() => {}}*/}
          {/*    iconName={endIcon}*/}
          {/*    color={disabled ? label_low_emphasis : undefined}*/}
          {/*    label={''}*/}
          {/*  />*/}
          {/*)}*/}
          {/* TODO: ICON HERE */}
        </Animated.View>
        <Animated.View
          pointerEvents="none"
          style={[styles.blueBackground, coloredBackgroundStyle]}
        />
        <Animated.View
          pointerEvents="none"
          style={[styles.greyBorderContainer, greyBorderStyle]}
        />
        <Animated.View
          pointerEvents="none"
          style={[styles.blueBorder, coloredBorderStyle]}
        />
      </View>
    </>
  );
};

const dynamicStyles = new DynamicStyleSheet(
  () =>
    ({
      inputLabelContainer: {
        position: "relative",
        borderWidth: 1,
        borderColor: "transparent",
      },
      label: {
        // Overline 2
        ...theme.textStyles.overline,
        textTransform: "uppercase",
      },
      textInpContainer: {
        padding: theme.spacing.xxs,
        display: "flex",
        flexDirection: "row",
        borderRadius: theme.borderRadius.regular,
      },
      textInput: {
        flexGrow: 1,
        padding: theme.spacing.xs,
        ...theme.textStyles.body_01,
        color: theme.colors.label_high_emphasis,
      },
      blueBackground: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        left: 0,
        backgroundColor: theme.colors.tint_primary_01,
        borderRadius: theme.borderRadius.regular,
      },
      greyBorderContainer: {
        position: "absolute",
        borderWidth: theme.borders.normal,
        width: "100%",
        bottom: 0,
        left: 0,
        borderRadius: theme.borderRadius.regular,
        zIndex: 1,
      },
      blueBorder: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        // Arbitary height in order to enforce border-radius
        height: 100,
        borderBottomWidth: theme.borders.thick,
        borderBottomColor: theme.colors.primary,
        borderRadius: theme.borderRadius.regular,
      },
    } as const)
);
