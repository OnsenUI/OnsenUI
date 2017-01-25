export default {
  bind(el, binding, vnode) {
    el.checked = binding.value;
    vnode.child.$on('change', event => {
      if (vnode.context.hasOwnProperty(binding.expression)) {
        vnode.context[binding.expression] = event.target.checked;
      }
    });
  },

  update(el, binding, vnode) {
    if (binding.value !== el.checked) {
      el.checked = binding.value;
    }
  }
};
