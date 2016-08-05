var webpack = require('webpack');
var path = require('path');
var glob = require('glob');

// Webpack Config
var webpackConfig = {
  entry: (function() {
    var result = {};

    glob.sync('./examples/*.ts').forEach(function(target) {
      var key = path.basename(target, '.ts') + '-example';
      result[key] = target;
    });

    result['polyfills'] = ['./src/polyfills.ts'];
    result['vendor'] = ['./src/vendor.ts'];
    result['angular2-onsenui'] = ['./src/angular2-onsenui.ts'];

    return result;
  })(),

  output: {
    path: __dirname + '/dist',
    publicPath: '/bundles/'
  },

  module: {
    loaders: [
      // .ts files for TypeScript
      {test: /\.ts$/, loader: 'awesome-typescript-loader'}
    ]
  }
};


// Our Webpack Defaults
var defaultConfig = {
  devtool: 'cheap-module-eval-source-map',
  cache: true,
  debug: true,
  output: {
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          path.join(__dirname, 'node_modules', 'rxjs'),
          path.join(__dirname, 'node_modules', '@angular2-material'),
        ]
      }
    ],
    noParse: [
      path.join(__dirname, 'node_modules', 'zone.js', 'dist'),
      path.join(__dirname, 'node_modules', 'angular2', 'bundles')
    ]
  },

  resolve: {
    root: [path.join(__dirname, 'src')],
    extensions: ['', '.ts', '.js']
  },

  devServer: {
    historyApiFallback: true,
    watchOptions: {aggregateTimeout: 300, poll: 1000},
    contentBase: '../..'
  },

  node: {
    global: 1,
    crypto: 'empty',
    module: 0,
    Buffer: 0
  }
};

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);
