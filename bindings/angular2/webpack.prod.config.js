const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

const pkg = JSON.parse(fs.readFileSync('package-dist.json', 'utf-8' ));

module.exports = {
  entry: './dist/ngx-onsenui.js', // string | object | array
  // Here the application starts executing
  // and webpack starts bundling

  output: {
    // options related to how webpack emits results

    path: path.resolve(__dirname, 'dist/bundles'), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)

    filename: 'ngx-onsenui.umd.js', // string
    // the filename template for entry chunks

    // publicPath: '/assets/', // string
    // the url to the output directory resolved relative to the HTML page

    library: 'NgxOnsenUI', // string,
    // the name of the exported library

    libraryTarget: 'umd', // universal module definition
    // the type of the exported library

    umdNamedDefine: true,
  },

  module: {
    // configuration regarding modules

    rules: [
      // rules for modules (configure loaders, parser options, etc.)

      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'dist'),
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
          presets: [
            ['env', { modules: false }]
          ],
          babelrc: false,
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

    extensions: ['.js']
    // extensions that are used
  },

  devtool: 'cheap-module-source-map', // enum
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
    '@angular/platform-browser': { // UMD
      commonjs: '@angular/platform-browser',
      commonjs2: '@angular/platform-browser',
      amd: '@angular/platform-browser',
      root: ['ng', 'platformBrowser']
    },
    'onsenui': { // UMD
      commonjs: 'onsenui',
      commonjs2: 'onsenui',
      amd: 'onsenui',
      root: 'ons'
    },
  },
  // Don't follow/bundle these modules, but request them at runtime from the environment

  plugins: [
    new webpack.BannerPlugin(`${pkg.name} v${pkg.version} - ${new Date()}`)
  ],
  // list of additional plugins,

  node: {
      process: false,
      setImmediate: false,
      timers: false,
  },
};
