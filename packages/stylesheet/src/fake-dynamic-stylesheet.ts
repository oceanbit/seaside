import {
  ColorSchemeContext,
  useColorScheme,
  useColorSchemeContext,
} from "./color-scheme-context";
import {
  DynamicStyleSheet,
  NormalizeStyles,
  UseDynamicStyleSheetOverwrites,
} from "./dynamic-style-sheet";
import { createParrotProxy } from "./css-variable-proxy";
import { ThemeRecord } from "./theme-context";
import { Mode } from "./types";

export const useFakeDynamicStyleSheet = <
  D extends DynamicStyleSheet<never, any>
>(
  styleSheet: D,
  overwrites?: UseDynamicStyleSheetOverwrites
): NormalizeStyles<ReturnType<D["__fn"]>> => {
  const mode = useFakeColorSchemeContext();
  const theme = createParrotProxy();
  return styleSheet.getStyleFor(
    overwrites?.mode || mode,
    (overwrites?.theme || theme) as never
  );
};

export const useFakeTheme = () => {
  return createParrotProxy() as ThemeRecord;
};

export function useFakeColorSchemeContext(): Mode {
  const explicitColorScheme = useColorScheme();

  return explicitColorScheme || "light";
}
