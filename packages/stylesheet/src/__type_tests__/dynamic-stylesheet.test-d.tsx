import { expectType } from "tsd-lite";

import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
} from "../dynamic-style-sheet";
import { theme } from "@seaside/components/src/constants/theme";
import { Platform, View } from "react-native";
import { WebStyle } from "@seaside/components/src/types/shared";

const dynamicStyles = new DynamicStyleSheet(() => ({
  switchBox: {
    paddingHorizontal: theme.spacing.xxs,
    paddingVertical: theme.spacing.s,
    ...Platform.select({
      web: {
        display: "inline-block",
        cursor: "pointer",
      } as WebStyle as {},
    }),
  },
}));

const Comp = () => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  expectType<number>(styles.switchBox.paddingHorizontal);
  return <View style={styles.switchBox}></View>;
};
