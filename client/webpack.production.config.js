const merge = require('webpack-merge');
const shared = require('./webpack.shared.config');
const webpack = require('webpack');

module.exports = merge(shared, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [new webpack.HashedModuleIdsPlugin()],
});
