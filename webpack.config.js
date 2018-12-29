const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require("webpack-md5-hash");
const CleanWebpackPlugin = require('clean-webpack-plugin');

// The path(s) that should be cleaned
let pathsToClean = [
  'dist',
  'build'
]

// The clean options to use
let cleanOptions = {
  exclude:  ['vendors'],
  verbose:  true,
  dry:      false
}

module.exports = {
  entry: { 
    main: './src/js/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  target: 'node',
  devServer: {
      contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [ 'babel-loader' ]
      },
      {
	test: /\.scss$/,
        use: [ 'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css",
    }),
    new htmlWebpackPlugin({
      inject: false,
      hash: true,
      filename: 'index.html',
      template: './src/index.html'
    }),
    new WebpackMd5Hash(),
  ],
};
