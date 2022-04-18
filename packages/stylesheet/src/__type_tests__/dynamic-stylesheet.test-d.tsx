import { expectError, expectType } from "tsd-lite";

import {
  DynamicStyleSheet,
  SheetProps,
  useDynamicStyleSheet,
} from "../dynamic-style-sheet";
import { Platform, View } from "react-native";

const baseTheme = {
  spacing: {
    xxs: 1,
    s: 2,
  },
};

const dynamicStyles = new DynamicStyleSheet(
  ({ theme }: SheetProps<typeof baseTheme>) =>
    ({
      switchBox: {
        paddingHorizontal: theme.spacing.xxs,
        paddingVertical: theme.spacing.s,
        ...Platform.select({
          web: {
            cursor: "pointer",
          },
        }),
      },
    } as const)
);

const Comp = () => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  expectType<number>(styles.switchBox.paddingHorizontal);
  expectError(styles.test.paddingHorizontal);
  return <View style={styles.switchBox}></View>;
};
