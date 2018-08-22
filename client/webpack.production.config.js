const merge = require('webpack-merge');
const shared = require('./webpack.shared.config');
const webpack = require('webpack');

module.exports = merge(shared, {
  devtool: 'source-map',
  mode: 'production',
  plugins: [new webpack.HashedModuleIdsPlugin()],
});
