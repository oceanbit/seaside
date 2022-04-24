import { ViewStyle, TextStyle, ImageStyle, StyleSheet } from "react-native";

import { IDynamicValue } from "./dynamic-value";
import { IndexedObject, Mode, ValueOf } from "./types";
import { useColorSchemeContext } from "./color-scheme-context";
import { ThemeRecord, useTheme } from "./theme-context";

declare const process: {
  env: {
    NODE_ENV: string;
  };
};

type Style = ViewStyle | TextStyle | ImageStyle;

type DynamicStyle<T extends Style> = {
  [Key in keyof T]: T[Key] | IDynamicValue<T[Key]>;
};
export type DynamicStyles<T> = { [P in keyof T]: DynamicStyle<Style> };

type NormalizeStyle<T> = T extends DynamicStyle<infer R> ? R : T;
export type NormalizeStyles<T extends DynamicStyles<T>> = {
  [Key in keyof T]: NormalizeStyle<T[Key]>;
};

export type DynamicViewStyle = DynamicStyle<ViewStyle>;
export type DynamicTextStyle = DynamicStyle<TextStyle>;
export type DynamicImageStyle = DynamicStyle<ImageStyle>;

export interface ParseStylesForProps {
  mode: Mode;
}

function parseStylesFor<T extends DynamicStyles<T>>(
  styles: T,
  props: ParseStylesForProps
): NormalizeStyles<T> {
  const newStyles: IndexedObject<IndexedObject<ValueOf<ValueOf<T>>>> = {};

  let containsDynamicValues = false;

  for (const i in styles) {
    const style = styles[i];
    type Value = ValueOf<ValueOf<T>>;
    const newStyle: IndexedObject<Value> = {};
    for (const i in style) {
      const value = style[i];

      const isValDynamic = (v: any): v is IDynamicValue<Value> =>
        v instanceof Function;
      if (isValDynamic(value)) {
        containsDynamicValues = true;
        newStyle[i] = value({ ...props });
      } else {
        newStyle[i] = value as Value;
      }
    }
    newStyles[i] = newStyle;
  }

  return newStyles as unknown as NormalizeStyles<T>;
}

export interface SheetProps<Theme> {
  mode: Mode;
  theme: Theme;
}

export type DynamicStyleSheetFn<Theme, T extends DynamicStyles<any>> = (
  props: SheetProps<Theme>
) => T;

export class DynamicStyleSheet<
  T extends never,
  Fn extends DynamicStyleSheetFn<T, any>
> {
  public readonly __fn: Fn;

  constructor(stylesFn: Fn) {
    this.__fn = stylesFn;
  }

  getStyleFor(mode: "light" | "dark", theme: never) {
    return StyleSheet.create(
      parseStylesFor(this.__fn({ mode, theme }), {
        mode,
      })
    );
  }
}

export interface UseDynamicStyleSheetOverwrites {
  mode?: Mode;
  theme?: ThemeRecord;
}

export const useDynamicStyleSheet = <D extends DynamicStyleSheet<never, any>>(
  styleSheet: D,
  overwrites?: UseDynamicStyleSheetOverwrites
): NormalizeStyles<ReturnType<D["__fn"]>> => {
  const mode = useColorSchemeContext();
  const theme = useTheme();
  return styleSheet.getStyleFor(
    overwrites?.mode || mode,
    (overwrites?.theme || theme) as never
  );
};
