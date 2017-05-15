var path = require('path');
var webpack = require('webpack');

module.exports = function(config) {
  config.set({
    browsers: [ 'Chrome' ], // run in Chrome
    singleRun: true, // just run once by default
    frameworks: [ 'mocha', 'chai' ], // use the mocha test framework
    files: [
      '../../build/css/onsenui.css',
      '../../build/css/onsen-css-components.css',
      {pattern: '../../build/css/font_awesome/**/*', served: true, included: false},
      {pattern: '../../build/css/ionicons/**/*', served: true, included: false},
      {pattern: '../../build/css/material-design-iconic-font/**/*', served: true, included: false},
      'tests.webpack.js' // just load this file
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ] // preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'dots' ], // report results in this format
    webpack: { // kind of a copy of your webpack config
      module: {
        // configuration regarding modules

        rules: [
          // rules for modules (configure loaders, parser options, etc.)

          {
            test: /\.js$/,
            include: [
              path.resolve(__dirname, 'test'),
            ],
            loader: 'babel-loader',
            // the loader which should be applied, it'll be resolved relative to the context
            // -loader suffix is no longer optional in webpack2 for clarity reasons
            // see webpack 1 upgrade guide

            options: {
              presets: ['env', 'stage-3', 'react'],
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

          'onsenui': path.join(__dirname, '../../build/js/onsenui.js')
          // modules aliases are imported relative to the current context
        }
      },

      devtool: 'eval-source-map', // enum
      // enhance debugging by adding meta info for the browser devtools
      // source-map most detailed at the expense of build speed.
    },
    webpackServer: {
      noInfo: true // please don't spam the console when running in karma!
    }
  });
};
