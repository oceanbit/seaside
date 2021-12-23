interface FontBase {
  fontFamily: string;
  // This matches the typings for `react-native` and should work for web as well
  fontWeight:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
}

export const rubikLightBase = {
  fontFamily: "Rubik",
  fontWeight: "300" as const,
};

export const rubikRegularBase = {
  fontFamily: "Rubik",
  fontWeight: "normal" as const,
};

export const rubikMediumBase = {
  fontFamily: "Rubik",
  fontWeight: "500" as const,
};

export const rubikBoldBase = {
  fontFamily: "Rubik",
  fontWeight: "bold" as const,
};

export const getTextStyles = (props?: {
  rubikLight: FontBase;
  rubikRegular: FontBase;
  rubikMedium: FontBase;
  rubikBold: FontBase;
}) => {
  const {
    rubikLight = rubikLightBase,
    rubikRegular = rubikRegularBase,
    rubikMedium = rubikMediumBase,
    rubikBold = rubikBoldBase,
  } = props || {};

  return {
    display: {
      ...rubikBold,
      fontSize: 48,
      lineHeight: 64,
    },

    headline_01: {
      ...rubikBold,
      fontSize: 34,
      lineHeight: 48,
    },

    headline_02: {
      ...rubikBold,
      fontSize: 28,
      lineHeight: 36,
    },

    headline_03: {
      ...rubikMedium,
      fontSize: 20,
      lineHeight: 28,
    },

    callout: {
      ...rubikMedium,
      fontSize: 16,
      lineHeight: 24,
    },

    body_01: {
      ...rubikRegular,
      fontSize: 16,
      lineHeight: 24,
    },

    body_02: {
      ...rubikRegular,
      fontSize: 14,
      lineHeight: 20,
    },

    caption_01: {
      ...rubikMedium,
      fontSize: 12,
      lineHeight: 16,
    },

    caption_02: {
      ...rubikRegular,
      fontSize: 12,
      lineHeight: 16,
    },

    overline: {
      ...rubikRegular,
      fontSize: 9,
      lineHeight: 12,
    },
  };
};

export const textStyles = getTextStyles();
