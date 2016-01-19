var escape = require('escape-html');

module.exports = {
  name: 'escape',
  process: function(str) {
    if (typeof str !== 'string') {
      return str;
    }

    return escape(str);
  }
};
