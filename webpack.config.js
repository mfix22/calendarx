const webpack = require('webpack')

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  devtool: 'source-map',

  entry: {
    index: './src/index.jsx'
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
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
  ]
}
