'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {DefinePlugin} = require('webpack')
const path = require('path')

module.exports = {
  entry: path.resolve('./assets/ts/index.ts'),
  devtool: 'inline-source-map',
  output: {
    path: path.resolve('./public'),
    filename: 'bundle.js',
    chunkFilename: '[name].chunkhash.js'
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js', '.scss']
  },
  module: {
    loaders: [
      {test: /\.ts$/, loader: 'ts-loader'},
      {test: /\.scss$/, use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 1
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }]
      })}
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: 'assets/html/index.html',
      filename: './index.html',
      minify: {
        collapseWhitespace: true
      }
    }),
    new DefinePlugin({
      'process.env.ISOLATED': JSON.stringify(process.env.ISOLATED)
    })
  ]
}
