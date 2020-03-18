const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    jsx: true,
    useJSXTextNode: false,
  },
  extends: ['airbnb', 'airbnb/hooks', 'plugin:prettier/recommended', 'prettier/react'],
  plugins: ['jest'],
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    'import/extensions': ['error', 'never'],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        // Set 'no-unused-vars' to off to suppress errors on importing types.
        // (e.g. error  'FunctionComponent' is defined but never used  no-unused-vars)
        // Unused vars are checked by TypeScript compiler (at-loader) instead.
        'no-unused-vars': 'off',
        'react/prop-types': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      webpack: { config: path.join(__dirname, 'webpack.prod.js') },
    },
  },
};
