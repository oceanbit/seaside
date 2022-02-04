module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-essentials'
  ],
  core: {
    builder: "webpack5",
  },
  typescript: { reactDocgen: false },
  staticDirs: ['./public'],
  previewHead: head => {
    if (process.env.CI) {
      return `
          <style>
            @font-face {
              src: url('/seaside/icomoon.ttf');
              font-family: "SeasideIcon";
            }
          </style>
          ${head}
      `;
    }
    return `
      <style>
        @font-face {
          src: url('/icomoon.ttf');
          font-family: "SeasideIcon";
        }
      </style>
      ${head}
    `;
  },
  webpackFinal: async (config, { configType }) => {
    // GitHub Actions CI
    if (process.env.CI) config.output.publicPath = '/seaside/';
    return config;
  },
  managerWebpack: async (config) => {
    // GitHub Actions CI
    if (process.env.CI) config.output.publicPath = '/seaside/';
    return config;
  }
};
