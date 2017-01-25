export default {
  bind(el, binding, vnode) {
    switch (vnode.elm.localName) {

      case 'ons-switch':
        el.checked = binding.value;
        vnode.child.$on('change', event => {
          if (vnode.context.hasOwnProperty(binding.expression)) {
            vnode.context[binding.expression] = event.target.checked;
          }
        });
        break;

      case 'ons-input':
        switch (el.type) {

          case 'radio':
            if (el.value === binding.value) {
              el.checked = true;
            }
            vnode.child.$on('change', event => {
              if (vnode.context.hasOwnProperty(binding.expression)) {
                vnode.context[binding.expression] = event.target.value;
              }
            });
            break;

          case 'checkbox':
            if (binding.value.includes(el.value)) {
              el.checked = true;
            }
            vnode.child.$on('change', event => {
              if (vnode.context.hasOwnProperty(binding.expression)) {
                if (vnode.context[binding.expression].includes(event.target.value)) {
                  vnode.context[binding.expression].splice(vnode.context[binding.expression].indexOf(event.target.value), 1);
                }
                else {
                  vnode.context[binding.expression].push(event.target.value);
                }
              }
            });
            break;

          default:
            el.value = binding.value;
            vnode.child.$on('input', event => {
              if (vnode.context.hasOwnProperty(binding.expression)) {
                vnode.context[binding.expression] = event.target.value;
              }
            });
        }
        break;
        
      case 'ons-range':
        el.value = binding.value;
        vnode.child.$on('input', event => {
          if (vnode.context.hasOwnProperty(binding.expression)) {
            vnode.context[binding.expression] = event.target.value;
          }
        });
        break;
    }
  },

  update(el, binding, vnode) {
    switch (vnode.elm.localName) {

      case 'ons-switch':
        if (binding.value !== el.checked) {
          el.checked = binding.value;
        }
        break;

      case 'ons-input':
        switch (el.type) {

          case 'radio':
            if (vnode.context.hasOwnProperty(binding.expression) && vnode.context[binding.expression] !== el.value) {
              el.checked = false;
            }
            break;
            
          case 'checkbox':
            if (vnode.context.hasOwnProperty(binding.expression) && !vnode.context[binding.expression].includes(el.value)) {
              el.checked = false;
            }
            break;
        }
        break;
    }
  }
};
