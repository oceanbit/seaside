import * as React from 'react';
import {View, TouchableWithoutFeedback, Animated} from 'react-native';
import {theme} from '../constants/theme';
import {DynamicStyleSheet, useDynamicValue} from 'react-native-dynamic';

export interface SeaSwitchProps {
    enabled: boolean;
    disabled?: boolean;
    setEnabled: (val: boolean) => void;
    label?: string;
}

const animTiming = 150;

export const Switch = ({enabled, setEnabled, disabled, label}: SeaSwitchProps) => {
    const styles = useDynamicValue(dynamicStyles);

    const primary = useDynamicValue<string>(theme.colors.primary);
    const tint_on_surface_16 = useDynamicValue<string>(theme.colors.tint_on_surface_16);
    const tint_on_surface_08 = useDynamicValue<string>(theme.colors.tint_on_surface_08);
    const ripple_surface = useDynamicValue<string>(theme.colors.ripple_surface);

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

    const trackBGColor = switchPrimaryBG.interpolate({
        // These interpolated values must be in this order, otherwise, when transitioning from "enabled" to "disabled",
        // the colors will flash in a weird/bad order
        inputRange: [0, 1, 2],
        outputRange: [tint_on_surface_08, tint_on_surface_16, primary],
    });

    const thumbBGColor = thumbDisabled.interpolate({
        inputRange: [0, 1],
        outputRange: ['white', ripple_surface],
    });

    const thumbAnim = {
        left: switchLeft,
        backgroundColor: thumbBGColor,
    };

    const switchTrackBG = {
        backgroundColor: trackBGColor,
    };

    return (
        <TouchableWithoutFeedback
            accessibilityRole={'switch'}
            accessibilityState={{
                disabled: disabled,
                selected: enabled
            }}
            testID={"switch"}
            {...(label ? {accessibilityLabel: label} : {})}
            onPress={() => !disabled && setEnabled(!enabled)}
        >
            <View style={styles.switchBox}>
                <Animated.View style={[styles.switchTrack, switchTrackBG]}>
                    <Animated.View style={[styles.switchThumb, thumbAnim]}/>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export const SwitchWatchedAttributes = ['enabled', 'disabled', 'label'] as Array<keyof SeaSwitchProps>

const dynamicStyles = new DynamicStyleSheet({
    switchBox: {
        paddingHorizontal: theme.spacing.xxs,
        paddingVertical: theme.spacing.s,
        cursor: 'pointer',
    },
    switchTrack: {
        padding: theme.spacing.xxs,
        width: theme.spacing.m * 2,
        height: theme.spacing.m,
        position: 'relative',
        backgroundColor: theme.colors.tint_on_surface_16,
        boxSizing: 'content-box',
        borderRadius: theme.spacing.m,
    },
    switchThumb: {
        position: 'absolute',
        width: theme.spacing.m,
        height: theme.spacing.m,
        left: theme.spacing.xxs,
        top: theme.spacing.xxs,
        borderRadius: theme.spacing.m,
    },
});
