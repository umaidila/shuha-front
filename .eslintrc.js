module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint',
    ],
    extends: [
      'plugin:@typescript-eslint/recommended',
      "prettier",
      "plugin:react-hooks/recommended"
    ],
  };