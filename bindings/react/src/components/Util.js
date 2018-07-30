const normalize = key => {
  if (/^is[A-Z]/.test(key)) {
    key = key.slice(2);
  }
  return key.replace(/([a-zA-Z])([A-Z])/g, '$1-$2').toLowerCase();
};

export default {
  eventToHandler(string) {
    return 'on' + string.charAt(0).toUpperCase() + string.slice(1);
  },

  /**
   * Turns an object of React props into an object of vanilla JS properties for a given component.
   *
   * @param {Object} el
   *   The component whose props should be converted
   * @param {Object} props
   *   The props that should be converted (default: all props)
   * @param {Object} nameMap
   *   Map of 'react prop name' -> 'vanilla JS property name'. Overrides default renaming scheme.
   */
  getAttrs(el, props = el.props, nameMap = {}) {
    const jsProperties = {};
    const validProps = el.constructor.propTypes || {};
    const ignoredProps = ['isOpen'];

    Object.keys(props).forEach(reactName => {
      const reactValue = props[reactName];

      // onClick and anything that isn't a valid React prop get added immediately
      if (!validProps.hasOwnProperty(reactName) || reactName === 'onClick') {
        jsProperties[reactName] = reactValue;

      // don't add any props we specifically want to ignore
      } else if (ignoredProps.indexOf(reactName) === -1) {
        const jsName = nameMap[reactName] || normalize(reactName);
        const type = typeof reactValue;

        if (type === 'boolean' && reactValue) {
          jsProperties[jsName] = '';
        } else if (type === 'string') {
          if (reactName === 'animationOptions') {
            jsProperties[jsName] = JSON.stringify(reactValue);
          } else {
            jsProperties[jsName] = reactValue;
          }
        } else if (type === 'number') {
          if (/(height|width)/i.test(reactName)) {
            jsProperties[jsName] = reactValue + 'px';
          } else {
            jsProperties[jsName] = reactValue;
          }
        }
      }
    });

    return jsProperties;
  }
};
