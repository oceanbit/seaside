const path = require("path");
const root = path.resolve(__dirname, "../");
const { reactRule } = require("@seaside/config/.webpack.config.js");

module.exports = ({config, mode}) => {
  config.module.rules.push(reactRule(root));

  config.resolve.alias = {
    ...config.resolve.alias,
    "react-native$": "react-native-web/dist/index.js"
  }

  config.resolve.extensions.push('.ts', '.tsx', '.js');

  return config;
};
