export default {
  sizeConverter(item) {
    if (typeof (item) === 'number') {
      return `${item}px`;
    } else {
      return item;
    }
  },

  numberConverter(item) {
    return `${item}px`;
  },

  animationOptionsConverter(options) {
    var keys = Object.keys(options);
    var innerString = keys.map((key) => key + ': "' + options[key] + '"');
    return '{' + innerString.join(',') + '}';
  },

  convert(dict, name, additionalDict = {}) {
    const fun = additionalDict.fun ? additionalDict.fun : (x) => x;
    const newName = additionalDict.newName ? additionalDict.newName : name;

    var val = dict[name];
    if (val) {
      if (newName !== name) {
        delete dict[name];
      }
      dict[newName] = fun(val);
    } else {
      dict[newName] = null;
    }
    return dict;
  }
};
