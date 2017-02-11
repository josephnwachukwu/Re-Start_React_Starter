const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const src = path.join(process.cwd(), 'src')
const dist = path.join(process.cwd(), 'dist')
const config = path.join(process.cwd(), 'config')

module.exports = {
  entry: [ 'babel-polyfill', 'whatwg-fetch', src ],
  output: { filename: 'main.js', path: dist },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [ src ],
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|gif|otf|eot|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader'
      },
      { test: /\.json$/,
        loader: 'json-loader',
        include: [ config, src ]
      },
      { test: /\.(jpg|png|gif)$/, loader: 'url-loader' },
      { test: /\.css\.svg$/, loader: 'svg-url-loader' },
      { test: /^(?!.*\.css\.svg$).*\.svg$/, loader: 'svg-react-loader' },
      {
        test: /\.css$/,
        include: [ path.resolve('./node_modules'), src ],
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            { loader: 'css-loader', options: { modules: true } },
            'postcss-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new FaviconsWebpackPlugin(path.join(src, 'static/images/favicon.ico')),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: process.cwd(),
        postcss: [
          require('postcss-smart-import')(),
          require('postcss-simple-vars')({
            variables: require(path.join(src, 'theme/variables'))
          }),
          require('postcss-cssnext')({
            browsers: '> 1%, last 2 versions, Firefox ESR, iOS 7'
          })
        ]
      }
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: path.join(src, 'index.html')
    }),
    new ExtractTextPlugin('main.css'),
    new CopyWebpackPlugin([
      { from: path.join(src, 'static'), to: 'static' }
    ], {
      copyUnmodified: true
    })
  ],
  devServer: {
    host: '0.0.0.0',
    historyApiFallback: true
  },
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
}
