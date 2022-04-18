import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { Appearance } from "react-native";

import { Mode } from "./types";

/**
 * Do not use built-in `useColorScheme` hook, it introduces bugs at changetime.
 * @see https://github.com/oceanbit/seaside-docs/issues/5#issuecomment-1101277049
 */
export const useColorScheme = () => {
  const [scheme, setScheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const listener = Appearance.addChangeListener((matches) => {
      setScheme(matches.colorScheme || null);
    });
    return () => listener.remove();
  }, []);

  return scheme;
};

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

  return context || explicitColorScheme || "light";
}
