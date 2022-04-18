import { createContext, useContext, ReactNode } from "react";
import { IDynamicValue } from "./dynamic-value";

export type ThemeRecord = {
  [key: string]:
    | string
    | number
    | IDynamicValue<string>
    | IDynamicValue<number>
    | ThemeRecord;
};

interface ThemeContextType {
  theme: ThemeRecord;
}
export const ThemeContext = createContext<ThemeContextType>({ theme: {} });
ThemeContext.displayName = "ThemeContext";

interface ThemeProviderProps<T extends ThemeRecord> {
  theme: T;
  children: ReactNode;
}

export function ThemeProvider<T extends ThemeRecord>({
  children,
  theme,
}: ThemeProviderProps<T>) {
  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  return context.theme;
}
