// Karma configuration
// Generated on Thu Apr 09 2015 15:16:41 GMT+0900 (JST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai-as-promised', 'chai-spies', 'chai'],

    // list of files / patterns to load in the browser
    files: [
      '../../core/vendor/winstore-jscompat.js',
      '../../core/vendor/*.js',
      '../../core/lib/animit.js',
      '../../core/lib/doorlock.es6',
      '../../core/lib/ons.es6',
      '../../core/lib/ons-util.es6',
      '../../core/lib/modal-animator.es6',
      '../../core/lib/navigator-transition-animator.es6',
      '../../core/lib/popover-animator.es6',
      '../../core/lib/*.{es6,js}',
      '../../core/*.{es6,js}',
      '../../core/elements/*.{es6,js}'
    ],

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '../../core/**/*.es6': ['webpack'],
      '../../core/*.es6': ['webpack']
    },

    webpack: {
        module: {
            preLoaders: [
                {
                  test: /\.es6$/,
                  loader: 'isparta'
                }
            ],
        }
    },

/*    babelPreprocessor: {
      options: {
        sourceMap: 'inline'
      },
      filename: function (file) {
        console.log(file);
        return file.originalPath.replace(/\.es6$/, '.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },*/

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
