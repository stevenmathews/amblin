const {resolve} = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const plugins = require('./plugins')
const publicIPv4Url = require('./publicIPv4Url')

const srcPath = resolve('src')
const distPath = resolve('dist')
const isDev = process.env.NODE_ENV === 'dev'

const babelLoader = {
  test: /\.js$/,
  use: 'babel-loader',
  exclude: /node_modules/
}

const cssLoader = {
  test: /.css$/,
  loader: ExtractTextPlugin.extract({
    use: 'css-loader',
    allChunks: true
  })
}

const vender = [
  '@cycle/run',
  '@cycle/dom',
  'cyclic-router',
  'history',
  'ramda',
  'switch-path',
  'xstream'
]

const config = {
  context: srcPath,
  entry: {
    app: './app.js',
    vender
  },
  output: {
    path: distPath,
    filename: isDev ? '[name].js' : '[name].[chunkhash].js',
    pathinfo: !isDev
  },
  devServer: {
    public: `${publicIPv4Url()}:8081`,
    host: '0.0.0.0',
    contentBase: distPath,
    quiet: true,
    historyApiFallback: true
  },
  devtool: isDev ? 'cheap-module-eval-source-map' : '',
  module: {
    loaders: [
      babelLoader,
      cssLoader
    ]
  },
  plugins,
  resolve: {
    alias: {
      components: `${srcPath}/components`,
      styles: `${srcPath}/styles`,
      drivers: `${srcPath}/drivers`,
      pages: `${srcPath}/pages`,
      utils: `${srcPath}/utils`
    }
  }
}

module.exports = config
