const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');
const packageJson = require('./package.json');

const srcDir = 'src';
const projectName = packageJson.name;
const projectAuthor = packageJson.author;
const licenseName = packageJson.license;
const thisYear = new Date().getFullYear();
const copyright =
  thisYear === 2018
    ? `Copyright (C) 2018 ${projectAuthor}`
    : `Copyright (C) 2018 - ${thisYear} ${projectAuthor}`;
const banner = `${projectName} ${packageJson.version}
${packageJson.homepage}
This software is distributed under ${licenseName} license.
${copyright}`;

const body = {
  entry: [`./${packageJson.main}`],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/public/assets/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        include: [path.resolve(__dirname, 'node_modules')],
        loader: 'file-loader',
      },
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, srcDir)],
        loader: 'babel-loader',
      },
      {
        test: /\.(ts|tsx)$/,
        include: [path.resolve(__dirname, srcDir)],
        loader: 'ts-loader',
      },
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'node_modules')],
        enforce: 'pre',
        loader: 'source-map-loader',
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [path.resolve(__dirname, srcDir)],
        enforce: 'pre',
        loader: 'stylelint-custom-processor-loader',
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [path.resolve(__dirname, srcDir)],
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          configFile: './.eslintrc.js',
          failOnError: true,
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx'],
    modules: ['node_modules'],
    alias: {
      '~': path.resolve(__dirname, srcDir),
    },
  },
  plugins: [
    new webpack.BannerPlugin({
      banner,
      raw: false,
      entryOnly: true,
    }),
  ],
};

module.exports = {
  body,
};
