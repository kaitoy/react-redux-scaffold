module.exports = {
  env: {
    browser: true,
    'jest/globals': true,
  },
  parser: 'typescript-eslint-parser',
  parserOptions: {
    jsx: true,
    useJSXTextNode: false,
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['jest'],
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        // Set 'no-unused-vars' to off to suppress errors on importing types.
        // (e.g. error  'FunctionComponent' is defined but never used  no-unused-vars)
        // Unused vars are checked by TypeScript compiler (at-loader) instead.
        'no-unused-vars': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
