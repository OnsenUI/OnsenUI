const _addHandler = (binding, vnode, eventName) => {
  const modelKey = binding.expression.trim();
  if (vnode.context.hasOwnProperty(modelKey)) {
    vnode.child.$on('post' + eventName, event => {
      vnode.context[modelKey] = eventName === 'open';
    });
  }
};
const _updateState = (el, binding, vnode) => {
  if (binding.value !== el.isOpen) {
    el[binding.value ? 'open' : 'close'].call(el, vnode.child.options);
  }
};

// VOnsOpen directive
export default {
  bind(el, binding, vnode) {
    const tag = el.tagName.toLowerCase();
    if (tag !== 'ons-splitter-side') {
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

