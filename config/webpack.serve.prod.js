const path = require('path')
const devServer = require('./webpack').devServer
const config = {
  entry: [],
  devServer: Object.assign(
    devServer,
    {
      port: 3000,
      compress: true,
      contentBase: path.join(process.cwd(), 'dist')
    }
  )
}
module.exports = config
