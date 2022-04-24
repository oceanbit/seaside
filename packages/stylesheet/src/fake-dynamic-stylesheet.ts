import { useColorSchemeContext } from "./color-scheme-context";
import {
  DynamicStyleSheet,
  NormalizeStyles,
  UseDynamicStyleSheetOverwrites,
} from "./dynamic-style-sheet";
import { createParrotProxy } from "./css-variable-proxy";

export const useFakeDynamicStyleSheet = <
  D extends DynamicStyleSheet<never, any>
>(
  styleSheet: D,
  overwrites?: UseDynamicStyleSheetOverwrites
): NormalizeStyles<ReturnType<D["__fn"]>> => {
  const mode = useColorSchemeContext();
  const theme = createParrotProxy();
  return styleSheet.getStyleFor(
    overwrites?.mode || mode,
    (overwrites?.theme || theme) as never
  );
};
