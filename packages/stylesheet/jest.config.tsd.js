module.exports = {
  displayName: {
    color: "blue",
    name: "types",
  },
  runner: "jest-runner-tsd",
  testMatch: [
    "**/__type_tests__/*.test-d.ts",
    "**/__type_tests__/*.test-d.tsx",
  ],
};
