import "../globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@seaside/components/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
