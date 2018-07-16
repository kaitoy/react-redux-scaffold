module.exports = {
  env: {
    browser: true,
    'jest/globals': true,
  },
  parser: 'babel-eslint',
  extends: ['airbnb', 'plugin:flowtype/recommended', 'prettier'],
  plugins: ['flowtype', 'jest'],
};
