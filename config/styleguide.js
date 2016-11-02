const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = Object.assign({}, require('./webpack'))

const styleguide = path.join(process.cwd(), 'styleguide')
const src = path.join(process.cwd(), 'src')
const dist = path.join(process.cwd(), 'dist')

config.entry = [ 'babel-polyfill', 'whatwg-fetch', styleguide ]
config.output = { filename: 'styleguide.js', path: dist }
config.plugins = [
  new HtmlWebpackPlugin({
    template: path.join(src, 'index.html'),
    filename: 'styleguide.html'
  }),
  new ExtractTextPlugin('styleguide.css'),
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
