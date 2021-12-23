import { color_tokens } from "./color_tokens";
import { colors } from "./colors";
import { textStyles } from "./text_styles";
import { spacing } from "./spacing";
import { opacity } from "./opacity";
import { borders } from "./borders";
import { borderRadius } from "./border_radius";

const baseTheme = {
  textStyles: textStyles,
  spacing: spacing,
  opacity: opacity,
  borders: borders,
  borderRadius: borderRadius,
};

export const lightTheme = {
  ...baseTheme,
  colors: {
    ...colors,
    on_primary: color_tokens.on_primary_light,
    primary: color_tokens.primary_light,
    label_high_emphasis: color_tokens.label_high_emphasis_light,
    label_medium_emphasis: color_tokens.label_medium_emphasis_light,
    label_low_emphasis: color_tokens.label_low_emphasis_light,
    floating_surface: color_tokens.floating_surface_light,
    surface: color_tokens.surface_light,
    error: color_tokens.error_light,
    error_background: color_tokens.error_background_light,
    on_change: color_tokens.on_change_light,
    change_addition: color_tokens.change_addition_light,
    change_removal: color_tokens.change_removal_light,
    change_mixed: color_tokens.change_mixed_light,
    change_refactored: color_tokens.change_refactored_light,
    ripple_primary: color_tokens.ripple_primary_light,
    ripple_neutral: color_tokens.ripple_neutral_light,
    tint_neutral_01: color_tokens.tint_neutral_01_light,
    tint_neutral_02: color_tokens.tint_neutral_02_light,
    tint_neutral_03: color_tokens.tint_neutral_03_light,
    tint_primary_01: color_tokens.tint_primary_01_light,
  },
};

export const darkTheme = {
  ...baseTheme,
  colors: {
    ...colors,
    on_primary: color_tokens.on_primary_dark,
    primary: color_tokens.primary_dark,
    label_high_emphasis: color_tokens.label_high_emphasis_dark,
    label_medium_emphasis: color_tokens.label_medium_emphasis_dark,
    label_low_emphasis: color_tokens.label_low_emphasis_dark,
    floating_surface: color_tokens.floating_surface_dark,
    surface: color_tokens.surface_dark,
    error: color_tokens.error_dark,
    error_background: color_tokens.error_background_dark,
    on_change: color_tokens.on_change_dark,
    change_addition: color_tokens.change_addition_dark,
    change_removal: color_tokens.change_removal_dark,
    change_mixed: color_tokens.change_mixed_dark,
    change_refactored: color_tokens.change_refactored_dark,
    ripple_primary: color_tokens.ripple_primary_dark,
    ripple_neutral: color_tokens.ripple_neutral_dark,
    tint_neutral_01: color_tokens.tint_neutral_01_dark,
    tint_neutral_02: color_tokens.tint_neutral_02_dark,
    tint_neutral_03: color_tokens.tint_neutral_03_dark,
    tint_primary_01: color_tokens.tint_primary_01_dark,
  },
};

export const fullTheme = {
  ...baseTheme,
  colors: {
    ...colors,
    ...color_tokens,
  },
};
