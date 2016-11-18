const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = Object.assign({}, require('./webpack'))

console.log('cwd', process.cwd());

const polaris = path.join(process.cwd(), 'polaris')
const src = path.join(process.cwd(), 'src')
const dist = path.join(process.cwd(), 'dist')

config.entry = [ 'babel-polyfill', 'whatwg-fetch', polaris ]
config.output = { filename: 'polaris.js', path: dist }
config.plugins = [
  new HtmlWebpackPlugin({
    template: path.join(src, 'index.html'),
    filename: 'polaris.html'
  }),
  new ExtractTextPlugin('polaris.css'),
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
  })
]

module.exports = config
