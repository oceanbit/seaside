import {
  ThemeProvider as ThemeProviderBase,
  useTheme as useThemeBase,
} from "@seaside/stylesheet";
import { FC } from "react";
import { theme } from "../constants/theme";

export const ThemeProvider: FC = ({ children }) => {
  return <ThemeProviderBase theme={theme}>{children}</ThemeProviderBase>;
};

const useTheme = () => {
  return useThemeBase() as typeof theme;
};

export type Theme = typeof theme;
