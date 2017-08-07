var path = require('path');

module.exports = function (config) {
  config.set({
    browsers: ['ChromeHeadless'],
    singleRun: true,
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage'],
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    webpack: {
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
          }
        ]
      },
      resolve: {
        alias: {
          'vue-onsenui': path.join(__dirname, '..', '..', 'src'),
          'onsenui': path.join(__dirname, '..', '..', '..', '..', 'build', 'js', 'onsenui'),
        }
      },
      devtool: '#inline-source-map'
    },
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  });
};
