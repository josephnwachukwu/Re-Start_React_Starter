const webpack = require('webpack')
const config = Object.assign({}, require('./webpack'))
config.plugins.unshift(
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  })
)
module.exports = [ config, require('./styleguide') ]
