var CleanCSS = require('clean-css');
var Q = require('q');

function minify(css) {
  var defer = Q.defer();
  var minified = new CleanCSS({noAdvanced: true}).minify(css);
  defer.resolve(minified);
  return defer.promise;
}

module.exports = minify;
