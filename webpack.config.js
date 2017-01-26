const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


const extractCSS = new ExtractTextPlugin('styles/[name].css')

const sassLoaders = [
  'css-loader',
  'sass-loader'
]

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.sass', '.scss']
  },

  devtool: 'source-map',

  entry: {
    index: './client/index.jsx'
  },

  output: {
    path: 'public',
    publicPath: 'http://localhost:8080/',
    filename: 'scripts/[name].js',
    chunkFilename: 'scripts/[id].chunk.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      // {
      //   test: /\.scss$/,
      //   loader: ['style', 'css', 'sass']
      // },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    extractCSS
  ]
}
