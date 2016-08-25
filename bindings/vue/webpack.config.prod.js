var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src',
  output: {
    library: 'VueOnsen',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    path: path.resolve(__dirname, './dist'),
    filename: 'vue-onsenui.js'
  },
  externals: [
    {
      onsenui: 'ons'
    }
  ],
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [/node_modules/]
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      }
    ]
  }
}
