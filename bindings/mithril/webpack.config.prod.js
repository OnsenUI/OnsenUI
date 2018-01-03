var path = require('path')
var fs = require('fs');
var webpack = require('webpack')

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8' ));

module.exports = {
  entry: {
    'mithril-onsenui': './src',
    'mithril-onsenui.min': './src'
  },
  output: {
    library: 'MithrilOnsen',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  externals: [
    {
      onsenui: {
        root: 'ons',
        commonjs: 'onsenui',
        commonjs2: 'onsenui',
        amd: 'onsenui'
      }
    },
    {
      mithril: {
        root: 'Mithril',
        commonjs: 'mithril',
        commonjs2: 'mithril',
        amd: 'mithril'
      }
    }
  ],
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      {
        test: /\.mithril$/,
        loader: 'mithril'
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
        loader: 'mithril-html'
      }
    ]
  },
  mithril: {
    esModule: false
  },
  devtool: '#source-map',
  plugins: [
    new webpack.BannerPlugin(`${pkg.name} v${pkg.version} - ${new Date()}`),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      compress: { warnings: false }
    })
  ]
}
