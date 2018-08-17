const merge = require('webpack-merge');
const shared = require('./webpack.shared.config');
const webpack = require('webpack');

module.exports = merge(shared, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './build',
    overlay: true,
    historyApiFallback: true,
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  plugins: [new webpack.NamedModulesPlugin()],
});
