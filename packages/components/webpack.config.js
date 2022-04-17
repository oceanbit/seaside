const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { reactRule } = require("@seaside/config/.webpack.config.js");

const root = path.resolve(__dirname, "./");

module.exports = [
  {
    name: "seaside-react-native",
    entry: "./src/index.tsx",
    externals: {
      "react-native": "react-native",
      react: "react",
      "react-dom": "react-dom",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-flow"],
              },
            },
            { loader: "ts-loader" },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(js|jsx)?$/,
          include: [
            path.resolve(root, "../../node_modules/react-native-uncompiled"),
            path.resolve(root, "../../node_modules/react-native-dynamic"),
            path.resolve(root, "../../node_modules/react-native-vector-icons"),
          ],
          use: [
            {
              loader: "babel-loader",
              options: {
                babelrc: false,
                configFile: false,
                cacheDirectory: true,
                presets: ["@babel/preset-react"],
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist"),
    },
  },
  {
    name: "declaration-files",
    entry: "./noop.js",
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: "src/**/*.d.ts",
            to: () => {
              return "[name][ext]";
            },
          },
        ],
      }),
    ],
    output: {
      filename: "noop.js",
      path: path.resolve(__dirname, "dist"),
    },
    dependencies: ["seaside-react-native"],
  },
  {
    name: "seaside-react",
    entry: "./src/index.tsx",
    externals: {
      react: {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react",
        umd: "react",
      },
      "prop-types": {
        root: "PropTypes",
        commonjs: "prop-types",
        commonjs2: "prop-types",
      },
      "react-dom": {
        root: "ReactDOM",
        commonjs2: "react-dom",
        commonjs: "react-dom",
        amd: "react-dom",
        umd: "react-dom",
      },
      "react-dom/server": {
        root: "ReactDOMServer",
        commonjs: "react-dom/server",
        commonjs2: "react-dom/server",
      },
    },
    module: {
      noParse: [
        require.resolve("react"),
        require.resolve("prop-types"),
        require.resolve("react-dom"),
        require.resolve("react-dom/server"),
      ],
      rules: [reactRule(root)],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    output: {
      filename: "react.js",
      path: path.resolve(__dirname, "dist"),
      libraryTarget: "commonjs",
    },
    // plugins: [new BundleAnalyzerPlugin()],
  },
  {
    name: "seaside-compat",
    entry: "./src/compat.ts",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "ts-loader",
              options: {
                configFile: "tsconfig.preact.json",
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(js|jsx)?$/,
          include: [
            path.resolve(root, "../../node_modules/react-native-uncompiled"),
            path.resolve(root, "../../node_modules/react-native-vector-icons"),
            path.resolve(root, "../stylesheet"),
          ],
          use: [
            {
              loader: "babel-loader",
              options: {
                babelrc: false,
                configFile: false,
                cacheDirectory: true,
                presets: ["@babel/preset-react"],
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        "react-native$": "react-native-web/dist/index.js",
        // Use Preact aliases
        react$: "preact/compat",
        "react-dom$": "preact/compat",
        // Fix the responder system which react-native-web depends on
        "react-dom/unstable-native-dependencies$":
          "preact-responder-event-plugin",
      },
    },
    output: {
      filename: "compat.js",
      path: path.resolve(__dirname, "dist"),
      libraryTarget: "umd",
      library: "Seaside",
    },
    // plugins: [new BundleAnalyzerPlugin()],
  },
];

module.exports.parallelism = 3;
