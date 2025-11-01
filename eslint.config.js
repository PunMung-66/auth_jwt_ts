const js = require("@eslint/js");
const globals = require("globals");
const tseslint = require("typescript-eslint");
const prettier = require("eslint-config-prettier");

module.exports = [
  // JavaScript files
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...prettier.rules,
    },
  },
  // TypeScript files
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.{ts,mts,cts}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
      },
      globals: globals.node,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      ...prettier.rules,
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-function-return-type": "warn",
    },
  },
];
