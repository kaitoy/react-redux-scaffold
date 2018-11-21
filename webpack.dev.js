const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const webpackMerge = require('webpack-merge');
const webpackCommon = require('./webpack.common.js');

module.exports = webpackMerge(webpackCommon.body, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    hot: true,
    port: 3000,
    // Full URL in publicPath is necessary for Hot Module Replacement.
    // The path part of the url must be / for dynamic import.
    publicPath: 'http://localhost:3000/',
    historyApiFallback: true,
  },
  plugins: [new HardSourceWebpackPlugin()],
});
