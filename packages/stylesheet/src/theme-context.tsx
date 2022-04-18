import { createContext, useContext, ReactNode } from "react";
import { SimpleRecord } from "./types";

interface ThemeContextType {
  theme: SimpleRecord;
}
export const ThemeContext = createContext<ThemeContextType>({ theme: {} });
ThemeContext.displayName = "ThemeContext";

interface ThemeProviderProps<T extends SimpleRecord> {
  theme: T;
  children: ReactNode;
}

export function ThemeProvider<T extends SimpleRecord>({
  children,
  theme,
}: ThemeProviderProps<T>) {
  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): SimpleRecord {
  const context = useContext(ThemeContext);

  return context.theme;
}
