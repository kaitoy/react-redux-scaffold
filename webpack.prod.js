// eslint-disable-next-line import/no-extraneous-dependencies
const CleanWebpackPlugin = require('clean-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpackMerge = require('webpack-merge');
const webpackCommon = require('./webpack.common.js');

module.exports = webpackMerge(webpackCommon.body, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [new CleanWebpackPlugin([webpackCommon.outputDir])],
});
