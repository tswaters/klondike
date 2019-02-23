'use strict'

const CircularDependencyPlugin = require('circular-dependency-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const { DefinePlugin } = require('webpack')
const path = require('path')
const packageJson = require('./package.json')

module.exports = (env, argv) => {
  const chunkhash = argv.mode === 'production' ? '.[chunkhash]' : ''

  const rules = [
    {
      test: /\.tsx?$/,
      loader: 'awesome-typescript-loader'
    },
    {
      test: /\.scss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader
        },
        {
          loader: 'typings-for-css-modules-loader',
          options: {
            sourceMap: true,
            importLoaders: 1,
            modules: true,
            namedExport: true,
            camelCase: true,
            localIdentName:
              argv.mode === 'production'
                ? '[hash:base64:5]'
                : '[path][name]__[local]--[hash:base64:5]'
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    }
  ]

  const plugins = [
    new CircularDependencyPlugin({
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd()
    }),
    new MiniCssExtractPlugin({
      filename: `[name]${chunkhash}.css`,
      chunkFilename: `[id]${chunkhash}.css`
    }),
    new HtmlWebpackPlugin({
      template: 'src/html/index.html',
      filename: './index.html',
      minify: {
        collapseWhitespace: argv.mode === 'production'
      }
    }),
    new DefinePlugin({
      'process.env.version': JSON.stringify(packageJson.version)
    }),
    new OfflinePlugin({
      ServiceWorker: {
        minify: argv.mode === 'production',
        events: true
      }
    })
  ]

  return {
    name: 'klondike',
    devtool: argv.mode === 'production' ? 'source-map' : 'eval-source-map',
    entry: {
      klondike: './src/ts/index.tsx'
    },
    target: 'web',
    output: {
      path: path.resolve('./dist'),
      filename: `[name]${chunkhash}.js`
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      minimizer: [
        new TerserPlugin({ sourceMap: true }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    resolve: {
      extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.scss']
    },
    module: {
      rules
    },
    plugins
  }
}
