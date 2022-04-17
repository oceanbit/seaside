import { ViewStyle, TextStyle, ImageStyle } from "react-native";

import { IDynamicValue } from "./dynamic-value";
import { IndexedObject, Mode, ValueOf } from "./types";
import { useColorSchemeContext } from "./context";

declare const process: {
  env: {
    NODE_ENV: string;
  };
};

type Style = ViewStyle | TextStyle | ImageStyle;

type DynamicStyle<T extends Style> = {
  [Key in keyof T]: T[Key] | IDynamicValue<T[Key]>;
};
type DynamicStyles<T> = { [P in keyof T]: DynamicStyle<Style> };

type NormalizeStyle<T> = T extends DynamicStyle<infer R> ? R : T;
export type NormalizeStyles<T extends DynamicStyles<T>> = {
  [Key in keyof T]: NormalizeStyle<T[Key]>;
};

export type DynamicViewStyle = DynamicStyle<ViewStyle>;
export type DynamicTextStyle = DynamicStyle<TextStyle>;
export type DynamicImageStyle = DynamicStyle<ImageStyle>;

function parseStylesFor<T extends DynamicStyles<T>>(
  styles: T,
  mode: Mode
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
        newStyle[i] = value({ isDark: mode === "dark" });
      } else {
        newStyle[i] = value as Value;
      }
    }
    newStyles[i] = newStyle;
  }

  if (!containsDynamicValues && process.env.NODE_ENV !== "production") {
    console.warn(
      "A DynamicStyleSheet was used without any DynamicValues. Consider replacing with a regular StyleSheet."
    );
  }

  return newStyles as unknown as NormalizeStyles<T>;
}

interface DynamicStyleSheetFnProps {
  mode: Mode;
  theme: object;
}

type DynamicStyleSheetFn<T extends DynamicStyles<any>> = (
  props?: DynamicStyleSheetFnProps
) => T;

export class DynamicStyleSheet<
  Fn extends DynamicStyleSheetFn<any> = DynamicStyleSheetFn<any>
> {
  public readonly __fn: Fn;

  constructor(stylesFn: Fn) {
    this.__fn = stylesFn;
  }

  getStyleFor(mode: "light" | "dark"): NormalizeStyles<ReturnType<Fn>> {
    return parseStylesFor(this.__fn({ mode, theme: {} }), mode);
  }
}

export const useDynamicStyleSheet = <Fn extends DynamicStyleSheetFn<any>>(
  styleSheet: DynamicStyleSheet<Fn>
) => {
  const mode = useColorSchemeContext();
  return styleSheet.getStyleFor(mode);
};
