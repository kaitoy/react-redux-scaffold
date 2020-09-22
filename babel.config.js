module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    // https://github.com/styled-components/jest-styled-components/issues/290
    ['babel-plugin-styled-components', { ssr: false, displayName: false }],
    [
      'babel-plugin-module-resolver',
      {
        root: ['./'],
        alias: { '~': './src' },
      },
    ],
  ],
};
