const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:9000',
    'webpack/hot/only-dev-server',
    './demo/index.js'
  ], // string | object | array
  // Here the application starts executing
  // and webpack starts bundling

  output: {
    // options related to how webpack emits results

    path: path.resolve(__dirname, 'demo'), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)

    filename: 'bundle.js', // string
    // the filename template for entry chunks

    // publicPath: '/assets/', // string
    // the url to the output directory resolved relative to the HTML page

    // library: 'Ons', // string,
    // the name of the exported library

    // libraryTarget: 'umd', // universal module definition
    // the type of the exported library
  },

  module: {
    // configuration regarding modules

    rules: [
      // rules for modules (configure loaders, parser options, etc.)

      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$|\.jsx$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'demo'),
        ],
        exclude: [
          // path.resolve(__dirname, 'app/demo-files')
        ],
        // these are matching conditions, each accepting a regular expression or string
        // test and include have the same behavior, both must be matched
        // exclude must not be matched (takes preferrence over test and include)
        // Best practices:
        // - Use RegExp only in test and for filename matching
        // - Use arrays of absolute paths in include and exclude
        // - Try to avoid exclude and prefer include

        loader: 'babel-loader',
        // the loader which should be applied, it'll be resolved relative to the context
        // -loader suffix is no longer optional in webpack2 for clarity reasons
        // see webpack 1 upgrade guide

        options: {
          presets: ['env', 'stage-3', 'react'],
          plugins: ['react-hot-loader/babel'],
          babelrc: false
        }
        // options for the loader
      }
    ]
  },

  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)

    modules: [
      'node_modules',
    ],
    // directories where to look for modules

    extensions: ['.js', '.jsx'],
    // extensions that are used

    alias: {
      // a list of module name aliases

      'onsenui': path.join(__dirname, '../../build/js/onsenui.js'),
      'react-onsenui': path.join(__dirname, 'src')
      // modules aliases are imported relative to the current context
    }
  },

  devtool: 'eval-source-map', // enum
  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed.

  devServer: {
    // proxy: { // proxy URLs to backend development server
    //   '/api': 'http://localhost:3000'
    // },
    // contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
    // compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    // https: false, // true for self-signed, object for cert authority
    // noInfo: true, // only errors & warns on hot reload
    port: 9000,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
  // list of additional plugins
};
