'use strict'

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OfflinePlugin = require('@lcdp/offline-plugin')
const { DefinePlugin } = require('webpack')
const path = require('path')
const packageJson = require('./package.json')

module.exports = (env, argv) => {
  const chunkhash = argv.mode === 'production' ? '.[chunkhash]' : ''
  return {
    name: 'klondike',
    devtool: argv.mode === 'production' ? 'source-map' : 'eval-source-map',
    entry: {
      klondike: './src/index.tsx',
    },
    target: 'web',
    output: {
      path: path.resolve('./dist'),
      filename: `[name]${chunkhash}.js`,
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      minimizer: [new TerserPlugin()],
    },
    resolve: {
      extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', 'css'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
        },

        {
          test: /\.css$/,
          use: [
            '@teamsupercell/typings-for-css-modules-loader',
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: false,
              },
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                esModule: true,
                modules: {
                  exportLocalsConvention: 'camelCaseOnly',
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new CircularDependencyPlugin({
        exclude: /node_modules/,
        failOnError: false,
        allowAsyncCycles: false,
        cwd: process.cwd(),
      }),
      new HtmlWebpackPlugin({
        template: 'src/html/index.html',
        filename: './index.html',
        minify: {
          collapseWhitespace: argv.mode === 'production',
        },
      }),
      new DefinePlugin({
        'process.env.version': JSON.stringify(packageJson.version),
      }),
      new OfflinePlugin({
        ServiceWorker: {
          minify: argv.mode === 'production',
          events: true,
        },
      }),
    ],
  }
}
