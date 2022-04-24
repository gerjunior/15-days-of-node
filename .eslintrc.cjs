module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  plugins: ['prettier'],
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-restricted-syntax': 'off',
    'no-plusplus': 'off',
    'no-console': 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        semi: false,
        bracketSpacing: true,
        arrowParens: 'always',
      },
    ],
  },
}
