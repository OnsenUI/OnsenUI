var path = require('path')
var fs = require('fs');
var webpack = require('webpack')

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8' ));

module.exports = {
  entry: {
    'vue-onsenui': './src',
    'vue-onsenui.min': './src'
  },
  output: {
    library: 'VueOnsen',
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
      vue: {
        root: 'Vue',
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue'
      }
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
