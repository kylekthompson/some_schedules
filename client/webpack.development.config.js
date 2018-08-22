const merge = require('webpack-merge');
const shared = require('./webpack.shared.config');
const webpack = require('webpack');

module.exports = merge(shared, {
  devServer: {
    contentBase: './build',
    historyApiFallback: true,
    overlay: true,
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  devtool: 'inline-source-map',
  mode: 'development',
  plugins: [new webpack.NamedModulesPlugin()],
});
