const merge = require('webpack-merge');
const shared = require('./webpack.shared.config');
const webpack = require('webpack');

module.exports = merge(shared, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: { contentBase: './build' },
  plugins: [new webpack.NamedModulesPlugin()],
});
