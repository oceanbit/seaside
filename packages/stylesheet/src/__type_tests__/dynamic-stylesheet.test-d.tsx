import { expectType } from "tsd-lite";

import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
} from "../dynamic-style-sheet";
import { Platform, View } from "react-native";

const baseTheme = {
  spacing: {
    xxs: 1,
    s: 2,
  },
};

const dynamicStyles = new DynamicStyleSheet<typeof baseTheme>(({ theme }) => ({
  switchBox: {
    paddingHorizontal: theme.spacing.xxs,
    paddingVertical: theme.spacing.s,
    ...Platform.select({
      web: {
        cursor: "pointer",
      },
    }),
  },
}));

const Comp = () => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  expectType<string | number | undefined>(styles.switchBox.paddingHorizontal);
  return <View style={styles.switchBox}></View>;
};
