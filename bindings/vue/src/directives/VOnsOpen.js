const _addHandler = (binding, vnode, eventName) => {
  vnode.child.$on('post' + eventName, event => {
    if (vnode.context.hasOwnProperty(binding.expression)) {
      vnode.context[binding.expression] = eventName === 'open';
    }
  });
};
const _updateState = (el, binding, vnode) => {
  if (binding.value !== el.isOpen) {
    el[binding.value ? 'open' : 'close'].call(el, vnode.child.options);
  }
};

export default {
  bind(el, binding, vnode) {
    const tag = el.tagName.slice(4).toLowerCase();
    if (tag !== 'splitter-side') {
      throw new Error('"v-ons-open" directive cannot be used with "' + tag + '" element.');
    }

    _updateState(el, binding, vnode)

    _addHandler(binding, vnode, 'open');
    _addHandler(binding, vnode, 'close');
  },

  update(el, binding, vnode) {
    _updateState(el, binding, vnode)
  }
};

