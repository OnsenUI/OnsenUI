
module.exports = {
  name: 'lang',
  process: function(str) {
    var lang = require('dgeni-packages/node_modules/nunjucks/src/globals').lang;

    if (typeof str !== 'string') {
      return str;
    }

    // Parse string
    if (str.indexOf('[' + lang + ']') == -1) {
      // Change to English if the specified locale is not found
      lang = 'en';
    }

    // Pull out part of string
    var regex = new RegExp('\\[' + lang + '\\](.+)\\[/' + lang + '\\]');
    var match;
    if (match = regex.exec(str)) {
      return match[1];
    }
    return str;
  }
};
