import { createContext, useContext, ReactNode } from "react";
import { useColorScheme } from "react-native";

import { Mode } from "./types";

type ContextType = ReturnType<typeof useColorScheme>;
export const ColorSchemeContext = createContext<ContextType>(null);
ColorSchemeContext.displayName = "ColorSchemeContext";

interface ColorSchemeProviderProps {
  mode?: Mode;
  children: ReactNode;
}

export function ColorSchemeProvider({
  children,
  mode,
}: ColorSchemeProviderProps) {
  const currentMode = useColorScheme();
  return (
    <ColorSchemeContext.Provider value={mode || currentMode || "light"}>
      {children}
    </ColorSchemeContext.Provider>
  );
}

export function useColorSchemeContext(): Mode {
  const context = useContext(ColorSchemeContext);

  const explicitColorScheme = useColorScheme();

  if (context) return context;

  return explicitColorScheme || "light";
}
