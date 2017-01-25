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
            console.log("checkbox");
            break;
          default:
            //regular text input
            console.log("text");
            console.log("value", el.value);
            console.log(el, binding, vnode);
            if (el.value === binding.value) {
              el.checked = true;
            }
            vnode.child.$on('change', event => {
              if (vnode.context.hasOwnProperty(binding.expression)) {
                vnode.context[binding.expression] = event.target.value;
              }
            });
        }
        break;
        
      case 'ons-range':
        console.log("range");
        break;

      default:
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
            console.log("update checkbox");
            break;
        }
        break;
        
      case 'ons-range':
        console.log("update range");
        break;

      default:
    }
  }
};
