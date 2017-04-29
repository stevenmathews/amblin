const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')

const env = process.env.NODE_ENV
const isDev = env === 'dev'

const basePlugins = [
  new ExtractTextPlugin(isDev ? '[name].css' : '[name].[chunkhash].css'),
  new HtmlWebpackPlugin({
    template: 'index.html'
  }),
  new webpack.DefinePlugin({
    'NODE_ENV': JSON.stringify(env)
  })
]

const prodPlugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: ['vendor', 'manifest']
  }),
  new InlineManifestWebpackPlugin({
    name: 'webpackManifest'
  }),
  new webpack.optimize.UglifyJsPlugin(),
  new OfflinePlugin()
]

module.exports = isDev
  ? basePlugins
  : basePlugins.concat(prodPlugins)
