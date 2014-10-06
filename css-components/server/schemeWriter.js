var defaultSchemes = require('../www/theme').schemes;
var fs = require('fs');

var writer = module.exports = {
  /**
   * @param {Object} scheme
   * @param {Object} scheme.name
   * @param {Object} scheme.colors
   */
  generateThemeStylus: function(scheme) {
    var stylus = Object.keys(scheme.colors).map(function(name) {
      var color = scheme.colors[name];
      return '$' + name + ' = ' + color;
    }).join('\n');
    var text = scheme.text;

    stylus += '\n\n@import \'components\'';

    return stylus;
  },

  /**
   * Generate stylus with color schemes.
   *
   * @param {Array} [schemes]
   */
  generate: function(schemes) {
    return (schemes || defaultSchemes).map(function(scheme) {
      return {
        name: scheme.text,
        stylus: writer.generateThemeStylus(scheme)
      };
    });
  },

  /**
   * @param {Array} [schemes]
   */
  write: function(schemes) {
    writer.generate(schemes).forEach(function(obj) {
      fs.writeFileSync(__dirname + '/../components-src/stylus/' + obj.name + '-theme.styl', obj.stylus);
    });
  }
};

if (process.argv[1] === __filename) {
  writer.write();
}
