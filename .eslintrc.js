module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier": ["error", {
      "singleQuote": true,
      "trailingComma": "all",
      "printWidth": 80,
      "tabWidth": 2,
      "useTabs": false,
      "semi": false,
      "bracketSpacing": true,
      "arrowParens": "always",
    }]
  },
};
