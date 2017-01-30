const _isTabbar = el => el.tagName.toLowerCase() === 'ons-tabbar';
const _getIndex = event => event[_isTabbar(event.target) ? 'index' : 'activeIndex'];
const _getActiveIndex = el => el[_isTabbar(el) ? 'getActiveTabIndex' : 'getActiveIndex']();
const _setActiveIndex = (el, value, options) => el[_isTabbar(el) ? 'setActiveTab' : 'setActiveIndex'](value, options);
const _setInitialIndex = (el, value) => {
  const attr = _isTabbar(el) ? 'activeIndex' : 'initial-index';
  if (!el.hasAttribute(attr)) {
    el.setAttribute(attr, value);
  }
};

// VOnsIndex directive
export default {
  bind(el, binding, vnode) {
    if (!['ons-tabbar', 'ons-carousel'].includes(el.tagName.toLowerCase())) {
      throw new Error('"v-ons-index" directive cannot be used with "' + tag + '" element.');
    }

    _setInitialIndex(el, binding.value);

    if (vnode.context.hasOwnProperty(binding.expression)) {
      vnode.child.$on('postchange', event => {
        vnode.context[binding.expression] = _getIndex(event);
      });
    }
  },

  update(el, binding, vnode) {
    if (binding.value !== _getActiveIndex(el)) {
      _setActiveIndex(el, binding.value, vnode.child.options);
    }
  }
};
