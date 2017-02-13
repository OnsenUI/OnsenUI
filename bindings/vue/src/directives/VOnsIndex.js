const _isTabbar = el => el.tagName.toLowerCase() === 'ons-tabbar';
const _getIndex = event => event[_isTabbar(event.target) ? 'index' : 'activeIndex'];
const _getActiveIndex = el => el[_isTabbar(el) ? 'getActiveTabIndex' : 'getActiveIndex']();
const _setInitialIndex = (el, value) => {
  const attr = _isTabbar(el) ? 'activeIndex' : 'initial-index';
  if (!el.hasAttribute(attr)) {
    el.setAttribute(attr, value);
  }
};

// VOnsIndex directive
export default {
  bind(el, binding, vnode) {
    const tag = el.tagName.toLowerCase();
    if (!['ons-tabbar', 'ons-carousel'].includes(tag)) {
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
      if (_isTabbar(el)) {
        let tab = el._getTabElement(binding.value);
        if (tab && tab.onClick instanceof Function) {
          tab.onClick();
        } else {
          el.setActiveTab(binding.value, vnode.child.options);
        }
        tab = null;
      } else {
        el.setActiveIndex(binding.value, vnode.child.options);
      }
    }
  }
};
