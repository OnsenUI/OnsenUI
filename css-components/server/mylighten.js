var stylus = require('stylus');

module.exports = function(param) {
  // case for color
  if (param.rgba) {
    var result = param.clone();
    result.rgba.a = 0.2;

    return result;
  }

  // case for undefined variable
  if (typeof param.name === 'string' && typeof param.string === 'string') {
    return new stylus.nodes.Ident(param.name + '--lighten', '', false);
  }

  throw new Error('mylighten() first argument must be color or ident.');
};
