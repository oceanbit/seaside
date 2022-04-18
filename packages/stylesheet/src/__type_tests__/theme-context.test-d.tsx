import { expectError } from "tsd-lite";

import { ThemeProvider } from "../theme-context";
import { View } from "react-native";

const Comp = () => {
  const provider = (
    <ThemeProvider theme={{ test: 1 }}>
      <View />
    </ThemeProvider>
  );

  expectError(
    <ThemeProvider theme={{ test: () => {} }}>
      <View />
    </ThemeProvider>
  );
};
