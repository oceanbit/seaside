import {
  lightTheme as lightSeaside,
  darkTheme as darkSeaside,
  fullTheme,
} from "@seaside/tokens/theme";
import { createDarkModeValue, IDynamicValue } from "@seaside/stylesheet";
import { textStyles } from "./text-styles";

/**
 * This is an awful lot of hackiness. Crazy how it still works, iddnit?
 */
const colors = Object.keys(lightSeaside.colors).reduce(
  (prev, key: string) => {
    const theKey = key as "primary";
    const lightVal = lightSeaside.colors[theKey];
    const darkVal = darkSeaside.colors[theKey];
    if (lightVal === darkVal) {
      prev[theKey] = lightVal as any;
    } else {
      prev[theKey] = createDarkModeValue(lightVal, darkVal);
    }
    return prev;
  },
  {
    label_medium_emphasis_no_opacity: createDarkModeValue("#717f9b", "#8f97a8"),
    // Temporary, as this should be moved into @oceanbit/styles
  } as Record<keyof typeof lightSeaside.colors, IDynamicValue<string>> & {
    label_medium_emphasis_no_opacity: IDynamicValue<string>;
  }
);

export const theme = {
  ...fullTheme,
  colors,
  textStyles: textStyles,
  breakpoints: {
    tablet: 768,
    singlePanelMaxWidth: 576,
  },
};
