const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const styleguide = path.join(process.cwd(), 'styleguide')
const src = path.join(process.cwd(), 'src')
const dist = path.join(process.cwd(), 'dist')

module.exports = {
  entry: [ 'babel-polyfill', 'whatwg-fetch', src ],
  output: { filename: 'main.js', path: dist },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [ src, styleguide ],
        exclude: /node_modules/
      },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(jpg|png|gif)$/, loader: 'url-loader' },
      { test: /\.css\.svg$/, loader: 'svg-url-loader' },
      { test: /^(?!.*\.css\.svg$).*\.svg$/, loader: 'svg-react-loader' },
      {
        test: /\.css$/,
        include: [ path.resolve('./node_modules'), src, styleguide ],
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
    new FaviconsWebpackPlugin(path.join(src, 'static/images/icon.png')),
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
  }
}
