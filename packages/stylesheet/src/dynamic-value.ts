import { useColorSchemeContext } from "./context";

interface IDynamicValueProps {
  isDark: boolean;
}

// Move this to a function so that when we introduce responsive functions, we can simply pass everything
// and support those dynamic values as well.
export type IDynamicValue<T> = ({ isDark }: IDynamicValueProps) => T;

export const createDarkModeValue = <T>(light: T, dark: T): IDynamicValue<T> => {
  return ({ isDark }) => {
    return isDark ? dark : light;
  };
};

export function useDarkModeValue<T>(dynamic: IDynamicValue<T>) {
  const mode = useColorSchemeContext();
  return dynamic({ isDark: mode === "dark" });
}
