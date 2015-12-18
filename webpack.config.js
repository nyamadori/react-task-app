var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/js/app.jsx',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.styl$/,
        loader: 'stylus'
      }
    ]
  }
};
