module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-essentials'
  ],
  core: {
    builder: "webpack5",
  },
  typescript: { reactDocgen: false },
  staticDirs: ['./public']
};
