const path = require('path')
const glob = require('glob');
const webpack = require('webpack')

module.exports = {
  entry: (function() {
    var result = {};

    glob.sync('./examples/*.ts').forEach(function(target) {
      var key = path.basename(target, '.ts') + '-example';
      result[key] = target;
    });

    return result;
  })(), // string | object | array
  // Here the application starts executing
  // and webpack starts bundling


  output: {
    // options related to how webpack emits results

    path: path.resolve(__dirname, 'dev'), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)

    filename: '[name].js', // string
    // the filename template for entry chunks

    publicPath: '/bundles/', // string
    // the url to the output directory resolved relative to the HTML page

    // library: 'Ons', // string,
    // the name of the exported library

    libraryTarget: 'umd', // universal module definition
    // the type of the exported library
  },

  module: {
    // configuration regarding modules

    rules: [
      // rules for modules (configure loaders, parser options, etc.)

      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: 'tsconfig.dev.json',
        },
      },
    ],
  },

  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)

    modules: [
      'node_modules',
    ],
    // directories where to look for modules

    extensions: ['.js', '.ts'],
    // extensions that are used

    alias: {
      // a list of module name aliases

      'onsenui': path.join(__dirname, '../../build/js/onsenui.js'),
      // modules aliases are imported relative to the current context
    }
  },

  // devtool: 'cheap-module-eval-source-map', // enum
  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed.

  externals: {
    '@angular/core': { // UMD
      commonjs: '@angular/core',
      commonjs2: '@angular/core',
      amd: '@angular/core',
      root: ['ng', 'core']
    },
    '@angular/common': { // UMD
      commonjs: '@angular/common',
      commonjs2: '@angular/common',
      amd: '@angular/common',
      root: ['ng', 'common']
    },
    '@angular/compiler': { // UMD
      commonjs: '@angular/compiler',
      commonjs2: '@angular/compiler',
      amd: '@angular/compiler',
      root: ['ng', 'compiler']
    },
    '@angular/platform-browser': { // UMD
      commonjs: '@angular/platform-browser',
      commonjs2: '@angular/platform-browser',
      amd: '@angular/platform-browser',
      root: ['ng', 'platformBrowser']
    },
    '@angular/platform-browser-dynamic': { // UMD
      commonjs: '@angular/platform-browser-dynamic',
      commonjs2: '@angular/platform-browser-dynamic',
      amd: '@angular/platform-browser-dynamic',
      root: ['ng', 'platformBrowserDynamic']
    },
    '@angular/forms': { // UMD
      commonjs: '@angular/forms',
      commonjs2: '@angular/forms',
      amd: '@angular/forms',
      root: ['ng', 'forms']
    },
    'onsenui': { // UMD
      commonjs: 'onsenui',
      commonjs2: 'onsenui',
      amd: 'onsenui',
      root: 'ons'
    },
  },
  // Don't follow/bundle these modules, but request them at runtime from the environment

  devServer: {
    // proxy: { // proxy URLs to backend development server
    //   '/api': 'http://localhost:3000'
    // },
    contentBase: path.join(__dirname, '../..'), // boolean | string | array, static file location
    // compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    // hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    // https: false, // true for self-signed, object for cert authority
    // noInfo: true, // only errors & warns on hot reload
    port: 9000,
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
  ],
  // list of additional plugins

  cache: true, // boolean
  // disable/enable caching

  watch: true, // boolean
  // enables watching

  watchOptions: {
    aggregateTimeout: 300, // in ms
    // aggregates multiple changes to a single rebuild

    poll: true,
    poll: 1000, // intervall in ms
    // enables polling mode for watching
    // must be used on filesystems that doesn't notify on change
    // i. e. nfs shares
  },

  node: {
      process: false,
      setImmediate: false,
      timers: false,
  },
};
