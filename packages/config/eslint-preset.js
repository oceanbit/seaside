module.exports = {
  plugins: ["prettier"],
  extends: ["react-app", "react-app/jest", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "testing-library/prefer-screen-queries": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_|h",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
  },
  overrides: [
    {
      files: ["*.stories.tsx"],
      rules: {
        "import/no-anonymous-default-export": "off",
      },
    },
  ],
};
