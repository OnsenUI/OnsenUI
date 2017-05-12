var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  context: __dirname + "/demo",
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:9000',
    'webpack/hot/only-dev-server',
    './index.js'
  ],
  output: {
    path: __dirname + '/demo',
    filename: "bundle.js"
  },
  devServer: {
    // contentBase
    colors: true,
    historyApiFallback: true,
    inline: false,
    port: 9000,
    hot: true
  },
  resolve: {
    alias: {
      'onsenui': path.join(__dirname, '../../build/js/onsenui.js')
    }
  },
  module: {
    loaders: [
   // font-awesome
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      { test: /\.js$|\.jsx$/,
        exclude: [/node_modules/, /onsenui\.js/],
        loaders: ['babel?' + JSON.stringify({presets: ['env', 'stage-3', 'react'], plugins: ['react-hot-loader/babel']})
        ]
      }
    ]
  },
  resolveLoader: { root: path.join(__dirname, "node_modules") },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
