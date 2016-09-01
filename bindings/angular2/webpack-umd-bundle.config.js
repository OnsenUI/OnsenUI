var path = require('path')
var fs = require('fs');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8' ));

module.exports = {
  entry: './dist/src/angular2-onsenui.js',
  output: {
    library: 'Angular2-OnsenUI',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    path: path.resolve(__dirname, './dist/bundles'),
    filename: 'angular2-onsenui.umd.js'
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
    nodeExternals({
      whitelist: ['process']
    })
  ],
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  devtool: '#source-map',
  plugins: [
    new webpack.BannerPlugin(`${pkg.name} v${pkg.version} - ${new Date()}`)
  ]
}
