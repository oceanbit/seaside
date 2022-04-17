const path = require("path");

module.exports = {
  reactRule(root) {
    return {
      test: /\.(ts|tsx|js|jsx)?$/,
      include: [
        path.resolve(root, "src"),
        path.resolve(root, "../../node_modules/react-native-uncompiled"),
        path.resolve(root, "../../node_modules/react-native-vector-icons"),
        path.resolve(root, "../stylesheet"),
        path.resolve(root, "../tokens"),
      ],
      use: [
        {
          loader: "babel-loader",
          options: {
            babelrc: false,
            configFile: false,
            cacheDirectory: true,
            presets: [
              ["@babel/preset-react", { runtime: "automatic" }],
              "@babel/preset-typescript",
            ],
            plugins: [["react-native-web"]],
          },
        },
      ],
    };
  },
};
