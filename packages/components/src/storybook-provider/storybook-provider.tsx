import React from "react";
import { ThemeProvider } from "../provider/theme-provider";

export const StorybookProvider: React.FC = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
