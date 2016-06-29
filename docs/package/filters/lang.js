
module.exports = {
  name: 'lang',
  process: function(str) {
    var lang = require('nunjucks/src/globals').lang;

    if (typeof str !== 'string') {
      return str;
    }

    // Parse string
    if (str.indexOf('[' + lang + ']') == -1) {

      if (lang === 'ja') {
        // Change to English if the specified locale is not found
        lang = 'en';
      } else {
        return '';
      }
    }

    // Pull out part of string
    var regex = lang === 'en' ?  /\[en]((.|\r|\n)*)\[\/en]/m : /\[ja]((.|\r|\n)*)\[\/ja]/m;
    var match;
    if (match = regex.exec(str)) {
      return match[1];
    }

    return str;
  }
};
