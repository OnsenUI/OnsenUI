// Karma configuration
// Generated on Thu Apr 09 2015 15:16:41 GMT+0900 (JST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: __dirname,


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai-as-promised', 'chai-spies', 'chai'],

    // list of files / patterns to load in the browser
    files: [
      'js/onsenui.magynhard.js',
      'test/unit/setup.js',
      `test/unit/browser-${global.KARMA_BROWSER}.js`, // no error occurs even if not found
      global.KARMA_DISABLE_WARNINGS ? 'test/unit/disable-warnings.js' : null,
      global.KARMA_SPEC_FILES || 'esm/**/*.spec.js',
      'css/onsenui.css',
      'css/onsen-css-components.css',
      {pattern: 'css/font_awesome/**/*', served: true, included: false},
      {pattern: 'css/ionicons/**/*', served: true, included: false},
      {pattern: 'css/material-design-iconic-font/**/*', served: true, included: false},
      {pattern: 'test/unit/test-template.html', served: true, included: false},
    ].filter(v => v != null),

    preprocessors: {
      'test/unit/setup.js': ['rollup'],
      'esm/**/*.spec.js': ['rollup']
    },

		rollupPreprocessor: {
			plugins: [
				require('rollup-plugin-node-resolve')(),
        require('rollup-plugin-commonjs')({ include: 'node_modules/**' }),
				require('@rollup/plugin-babel').babel({ babelHelpers: 'bundled' })
			],
      output: {
			  format: 'iife',         // Helps prevent naming collisions.
			  name: 'onsTest', // Required for 'iife' format.
			  sourcemap: 'inline'     // Sensible for testing.
      }
		},

    // list of files to exclude
    exclude: [
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'junit'],

    coverageReporter: {
      type: 'lcov'
    },

    failOnEmptyTestSuite: false,

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // define browser launchers which can be used in the `browsers` property.
    customLaunchers: {
      ////////////////////////////////////////
      // Desktop - Chrome
      ////////////////////////////////////////
      local_chrome: { // alias for `Chrome` (defined by `karma-chrome-launcher`)
        base: 'Chrome',
      },
      local_chrome_headless: { // alias for `ChromeHeadless` (defined by `karma-chrome-launcher`)
        base: 'ChromeHeadless',
      },

      ////////////////////////////////////////
      // Desktop - Safari
      ////////////////////////////////////////
      local_safari: { // alias for `Safari` (defined by `karma-safari-launcher`)
        base: 'Safari',
      },
      // To use a browser launcher which has `base: 'SauceLabs'`,
      // set process.env.SAUCE_USERNAME and process.env.SAUCE_ACCESS_KEY.
      // For more information, see https://github.com/karma-runner/karma-sauce-launcher
      remote_macos_safari: {
        base: 'SauceLabs',
        platform: 'OS X 10.13',
        browserName: 'Safari',
        version: '11',
      },

      ////////////////////////////////////////
      // Mobile - Android Chrome
      ////////////////////////////////////////

      ////////////////////////////////////////
      // Mobile - Android WebView
      ////////////////////////////////////////

      ////////////////////////////////////////
      // Mobile - Android Crosswalk WebView
      ////////////////////////////////////////

      ////////////////////////////////////////
      // Mobile - iOS Safari (iOS 8.1 - iOS 10.0)
      ////////////////////////////////////////
      // To use a browser launcher which has `base: 'SauceLabs'`,
      // set process.env.SAUCE_USERNAME and process.env.SAUCE_ACCESS_KEY.
      // For more information, see https://github.com/karma-runner/karma-sauce-launcher
      remote_iphone_5_simulator_ios_8_1_safari: {
        base: 'SauceLabs',
        appiumVersion: '1.6.0',
        deviceName: 'iPhone 5 Simulator',
        platformName: 'iOS',
        platformVersion: '8.1',
        deviceOrientation: 'portrait',
        browserName: 'Safari',
      },
      remote_iphone_5_simulator_ios_8_2_safari: {
        base: 'SauceLabs',
        appiumVersion: '1.6.0',
        deviceName: 'iPhone 5 Simulator',
        platformName: 'iOS',
        platformVersion: '8.2',
        deviceOrientation: 'portrait',
        browserName: 'Safari',
      },
      remote_iphone_5_simulator_ios_8_3_safari: {
        base: 'SauceLabs',
        appiumVersion: '1.6.0',
        deviceName: 'iPhone 5 Simulator',
        platformName: 'iOS',
        platformVersion: '8.3',
        deviceOrientation: 'portrait',
        browserName: 'Safari',
      },
      remote_iphone_5_simulator_ios_8_4_safari: {
        base: 'SauceLabs',
        appiumVersion: '1.6.0',
        deviceName: 'iPhone 5 Simulator',
        platformName: 'iOS',
        platformVersion: '8.4',
        deviceOrientation: 'portrait',
        browserName: 'Safari',
      },
      remote_iphone_5_simulator_ios_9_0_safari: {
        base: 'SauceLabs',
        appiumVersion: '1.6.0',
        deviceName: 'iPhone 5 Simulator',
        platformName: 'iOS',
        platformVersion: '9.0',
        deviceOrientation: 'portrait',
        browserName: 'Safari',
      },
      remote_iphone_5_simulator_ios_9_1_safari: {
        base: 'SauceLabs',
        appiumVersion: '1.6.0',
        deviceName: 'iPhone 5 Simulator',
        platformName: 'iOS',
        platformVersion: '9.1',
        deviceOrientation: 'portrait',
        browserName: 'Safari',
      },
      remote_iphone_5_simulator_ios_9_2_safari: {
        base: 'SauceLabs',
        appiumVersion: '1.6.0',
        deviceName: 'iPhone 5 Simulator',
        platformName: 'iOS',
        platformVersion: '9.2',
        deviceOrientation: 'portrait',
        browserName: 'Safari',
      },
      remote_iphone_5_simulator_ios_9_3_safari: {
        base: 'SauceLabs',
        appiumVersion: '1.6.0',
        deviceName: 'iPhone 5 Simulator',
        platformName: 'iOS',
        platformVersion: '9.3',
        deviceOrientation: 'portrait',
        browserName: 'Safari',
      },
      remote_iphone_5_simulator_ios_10_0_safari: {
        base: 'SauceLabs',
        appiumVersion: '1.6.0',
        deviceName: 'iPhone 5 Simulator',
        platformName: 'iOS',
        platformVersion: '10.0',
        deviceOrientation: 'portrait',
        browserName: 'Safari',
      },

      ////////////////////////////////////////
      // Mobile - iOS UIWebView
      ////////////////////////////////////////

      ////////////////////////////////////////
      // Mobile - iOS WKWebView
      ////////////////////////////////////////

    },


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      global.KARMA_BROWSER || 'local_chrome',
    ],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    autoWatchBatchDelay: 500,

    captureTimeout: 15 * 60 * 1000, // Sauce Labs sometimes requires a long time, so default value (60000) is not enough

    browserNoActivityTimeout: 60 * 1000, // same as above, default value (10000) is not enough
  });
};
