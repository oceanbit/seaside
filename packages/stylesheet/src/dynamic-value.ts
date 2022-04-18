import { useColorSchemeContext } from "./color-scheme-context";
import { Mode } from "./types";

interface IDynamicValueProps {
  mode: Mode;
}

// Move this to a function so that when we introduce responsive functions, we can simply pass everything
// and support those dynamic values as well.
export type IDynamicValue<T> = ({ mode }: IDynamicValueProps) => T;

export const createDarkModeValue = <T>(light: T, dark: T): IDynamicValue<T> => {
  return ({ mode }) => {
    return mode === "dark" ? dark : light;
  };
};

export function useDarkModeValue<T>(dynamic: IDynamicValue<T>) {
  const mode = useColorSchemeContext();
  return dynamic({ mode });
}
