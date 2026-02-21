export default [
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      import: require("eslint-plugin-import"),
    },
    rules: {
      "import/no-unresolved": ["error", { caseSensitive: true }],
      "import/named": "error",
      "import/default": "error",
      "import/namespace": "error",
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx"],
        },
      },
    },
  },
];