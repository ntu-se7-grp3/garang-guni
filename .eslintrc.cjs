module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react/prop-types": "off", // warn, off, on
    "no-unused-vars": "warn", // warn, off, on
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "react/no-unescaped-entities": "off", // Add this line to ignore the rule
  },
};
