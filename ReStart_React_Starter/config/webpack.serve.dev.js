const webpack = require('webpack')
const config = Object.assign({}, require('./webpack'))
config.entry.unshift(
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server'
)
config.devtool = '#source-map'
config.plugins.unshift(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('development')
    }
  })
)
module.exports = [ config ]
