const pixelSize = item => typeof item === 'number' ? `${item}px` : item;

const normalize = key => {
  if (/^is[A-Z]/.test(key)) {
    key = key.slice(2);
  }
  return key.replace(/([a-zA-Z])([A-Z])/g, '$1-$2').toLowerCase();
};

const convert = (dict, name, newName = name) => {
  if (dict.hasOwnProperty(name)) {
    switch (typeof dict[name]) {
      case 'boolean':
        if (dict[name]) {
          dict[newName] = '';
        } else {
          delete dict[newName];
        }
        break;
      case 'string':
      case 'number':
        dict[newName] = dict[name];
        break;
      default:
        dict[name] = null;
    }

    if (newName !== name) {
      dict[name] = null;
    }
  }

  return dict;
};


export default {
  eventToHandler(string) {
    return 'on' + string.charAt(0).toUpperCase() + string.slice(1);
  },

  getAttrs(el, props = el.props, dict = {}) {
    const attrs = { ...props };
    const validProps = el.constructor.propTypes || {};

    if (attrs.hasOwnProperty('animationOptions') && typeof attrs.animationOptions !== 'string') {
      attrs.animationOptions = JSON.stringify(attrs.animationOptions);
    }

    Object.keys(attrs)
      .forEach(key => {
        if (validProps.hasOwnProperty(key) && ['onClick'].indexOf(key) === -1) {
          if (['isOpen'].indexOf(key) !== -1) {
            attrs[key] = null;
          } else {
            if (/(height|width)/i.test(key)) {
              attrs[key] = pixelSize(attrs[key]);
            }
            convert(attrs, key, dict[key] || normalize(key));
          }
        }
      });

    return attrs;
  }
};
