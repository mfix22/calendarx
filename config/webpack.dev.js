var webpack = require('webpack')
var webpackMerge = require('webpack-merge')
var commonConfig = require('./webpack.common.js')
var helpers = require('./helpers')

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  entry: {
    app: './client/index.jsx',
    index: './client/js/index.js'
  },

  output: {
    path: helpers.root('public'),
    publicPath: 'http://localhost:8080/',
    filename: 'scripts/[name].js',
    chunkFilename: 'scripts/[id].chunk.js'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.SAVE_STATE_TO_LOCAL': JSON.stringify(process.env.SAVE_STATE_TO_LOCAL)
    }),
  ]
})
