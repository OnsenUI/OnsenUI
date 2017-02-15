var path = require('path');
var glob = require('glob');

module.exports = {
  entry: (function(){
    var entry = {};

    // Register entry file for vue-onsenui.js
    entry['dist/vue-onsenui'] = ['./src/index.js'];

    // Register entry file for JS files in test/e2e-webdriverio
    glob.sync('test/e2e-webdriverio/*/**/*.js').forEach(function(target) {
      // Ignore spec files and generated files
      if (/(.+)\.spec.js$/.test(target)) { return; }
      if (/(.+)\.bundle.js$/.test(target)) { return; }

      // Equivalent to:
      //   entry['test/e2e-webdriverio/*/**/*.bundle.js'] = ['./test/e2e-webdriverio/*/**/*.js'];
      entry[target.replace(/(.+)\.js$/, '$1.bundle')] = ['./' + target];
    });

    return entry;
  })(),
  output: {
    path: __dirname,
    publicPath: '/bindings/vue/',
    filename: '[name].js',
  },
  externals: [
    {
      onsenui: {
        'var': 'ons',
        'commonjs': 'onsenui',
        'amd': 'onsenui',
        'umd': 'onsenui',
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
  devServer: {
    contentBase: '../..',
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
  },
}
