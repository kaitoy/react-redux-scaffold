/* eslint-disable import/no-extraneous-dependencies */
const webpackMerge = require('webpack-merge');
const webpackCommon = require('./webpack.common.js');

module.exports = webpackMerge(webpackCommon, {
  mode: 'production',
  devtool: 'source-map',
});
