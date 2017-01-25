export default {
  bind(el, binding, vnode) {
    if (!el.hasAttribute('initial-index')) {
      el.setAttribute('initial-index', binding.value)
    }

    vnode.child.$on('postchange', event => {
      if (vnode.context.hasOwnProperty(binding.expression)) {
        vnode.context[binding.expression] = event.activeIndex;
      }
    });
  },

  update(el, binding, vnode) {
    if (binding.value !== el.getActiveIndex()) {
      el.setActiveIndex(binding.value, vnode.child.options);
    }
  }
};
