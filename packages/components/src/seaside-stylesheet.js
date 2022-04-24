// For some reason, importing @seaside/stylesheet/dist-cjs/index does not work
const stylesheet = require("../../stylesheet/dist-cjs/index");

module.exports = {
  ...stylesheet,
  useTheme: stylesheet.useFakeTheme,
  useColorSchemeContext: stylesheet.useFakeColorSchemeContext,
  useDynamicStyleSheet: stylesheet.useFakeDynamicStyleSheet,
};
