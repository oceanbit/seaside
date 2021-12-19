module.exports = ({config, mode}) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: [
            "@babel/preset-flow"
          ]
        }
      },
      {loader: 'ts-loader'}
    ],
  });

  config.resolve.alias = {
    ...config.resolve.alias,
    "react-native$": "react-native-web/dist/index.js"
  }

  config.resolve.extensions.push('.ts', '.tsx', '.js');

  return config;
};
