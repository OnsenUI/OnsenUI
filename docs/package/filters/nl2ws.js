
module.exports = {
  name: 'nl2ws',
  process: function(str) {
    if (typeof str !== 'string') {
      return str;
    }

    return str.trim().split(/[\r\n]+/).join(' ');
  }
};
