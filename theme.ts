import {color_tokens} from './color_tokens';
import {colors} from './colors';
import {textStyles} from './text_styles';
import {spacing} from './spacing';
import {opacity} from './opacity';
import {borders} from './borders';
import {borderRadius} from './border_radius';

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
    on_surface: color_tokens.on_surface_light,
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
    ripple_surface: color_tokens.ripple_on_surface_light,
    tint_on_surface_24: color_tokens.tint_on_surface_24_light,
    tint_on_surface_16: color_tokens.tint_on_surface_16_light,
    tint_on_surface_08: color_tokens.tint_on_surface_08_light,
    tint_on_surface_04: color_tokens.tint_on_surface_04_light,
    tint_primary_20: color_tokens.tint_primary_20_light,
    tint_primary_10: color_tokens.tint_primary_10_light,
  },
};

export const darkTheme = {
  ...baseTheme,
  colors: {
    ...colors,
    on_primary: color_tokens.on_primary_dark,
    primary: color_tokens.primary_dark,
    on_surface: color_tokens.on_surface_dark,
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
    ripple_surface: color_tokens.ripple_on_surface_dark,
    tint_on_surface_24: color_tokens.tint_on_surface_24_dark,
    tint_on_surface_16: color_tokens.tint_on_surface_16_dark,
    tint_on_surface_08: color_tokens.tint_on_surface_08_dark,
    tint_on_surface_04: color_tokens.tint_on_surface_04_dark,
    tint_primary_20: color_tokens.tint_primary_20_dark,
    tint_primary_10: color_tokens.tint_primary_10_dark,
  },
};

export const fullTheme = {
  ...baseTheme,
  colors: {
    ...lightTheme.colors,
    ...darkTheme.colors,
  },
};
