var Q = require('q');
var stylus = require('stylus');
var fs = require('fs');
var parseColor = require('color-parser');

var VALID_KEYS = [
  // "var-view-background",
  // "var-key-color",
  // "var-secondary-color",
  // "var-auxiliary-color"
];

function validate(variables){
  return Q.delay(0).then(function(){
    var validKey;
    for (var i = VALID_KEYS.length - 1; i >= 0; i--) {
      validKey = VALID_KEYS[i];
      if (!variables[validKey]) {
        throw new Error(validKey + ' must be defined');
      }
    };
    return variables;
  });
}

function compile(variables) {
  var defer = Q.defer();
  var renderer = stylus("");
  
  for (var key in variables) {
    var hex = variables[key];
    var rgba = parseColor(hex);
    var stylusColorNode = new stylus.nodes.RGBA(rgba.r, rgba.g, rgba.b, rgba.a);
    renderer.define('$' + key, stylusColorNode);
  }

  renderer.import(__dirname + '/../components-src/stylus/components/index.styl');

  renderer.render(function(err, css) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(css);
    }
  });
  return defer.promise;
}

module.exports = {
  compile: compile,
  validate: validate
};
