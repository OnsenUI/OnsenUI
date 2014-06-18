var autoprefixer = require('autoprefixer');
var Q = require('q');

function prefix(css){
  var defer = Q.defer();
  var prefixed = autoprefixer('> 1%', 'last 2 version', 'ff 12', 'ie 8', 'opera 12', 'chrome 12', 'safari 12', 'android 2').process(css).css;
  defer.resolve(prefixed);
  return defer.promise;
}

module.exports = prefix;
