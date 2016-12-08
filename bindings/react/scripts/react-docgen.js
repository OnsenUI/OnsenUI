var Module = require('module');
var originalRequire = Module.prototype.require;

Module.prototype.require = function(){
  if (arguments[0].indexOf('isReactComponentClass') > -1) {
    return function() {
      return true;
    }
  }

  return originalRequire.apply(this, arguments);
};

require('../node_modules/.bin/react-docgen');
