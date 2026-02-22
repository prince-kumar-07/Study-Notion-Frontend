import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default [
  js.configs.recommended,

  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      import: importPlugin,
      "react-refresh": reactRefresh,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      // 🔥 Turn off base rule
      "no-unused-vars": "off",

      // ✅ Use React-aware unused vars rule
      "react/jsx-uses-vars": "error",

      "react-refresh/only-export-components": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "import/no-unresolved": ["error", { caseSensitive: true }],
    },
  },

  {
    files: ["src/services/**/*.js"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
];