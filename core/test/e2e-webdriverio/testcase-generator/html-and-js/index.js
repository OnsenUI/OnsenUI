const path = require('path');
const $ = require('gulp-load-plugins')();
const webpack = require('webpack');

module.exports = function(generatorInputDir, generatedTestcaseDir) {
  return new Promise((resolve, reject) => {
    // Generate index.html and index.bundle.js with webpack
    $.util.log(`[${$.util.colors.magenta(`html-and-js`)}] Generating testcase based on: ${$.util.colors.blue(generatorInputDir)}`);
    try {
      webpack(
        { // webpack config
          entry: path.resolve(generatorInputDir, 'index.js'),
          output: {
            path: generatedTestcaseDir,
            filename: 'index.bundle.js'
          },
          module: {
            rules: [
              {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                  presets: ['es2015']
                }
              }
            ]
          },
          resolve: {
            extensions: ['.js']
          }
        },
        (err, stats) => {
          if (err) {
            reject();
            return;
          }

          const jsonStats = stats.toJson();
          if (jsonStats.errors.length > 0) {
            for (const error of jsonStats.errors) {
              $.util.log('\n' + $.util.colors.red(error));
            }
            reject();
          }
          if (jsonStats.warnings.length > 0) {
            for (const warning of jsonStats.warnings) {
              $.util.log('\n' + $.util.colors.yellow(warning));
            }
            reject();
          }

          resolve();
        }
      );
      // Generate index.spec.js

    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}
