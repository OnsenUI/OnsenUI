export default {
  bind(el, binding, vnode) {
    let modelKey = binding.expression.trim();
    let formatOutput = function(modifiers, output) {
      if (Object.keys(modifiers).length === 0) {
        return output;
      }
      if (modifiers.hasOwnProperty('number')) {
        output = Number(output);
      }
      if (modifiers.hasOwnProperty('trim')) {
        output = output.trim();
      }
      return output;
    }

    switch (vnode.elm.localName) {

      case 'ons-switch':
        el.checked = binding.value;
        vnode.child.$on('change', event => {
          if (vnode.context.hasOwnProperty(modelKey)) {
            vnode.context[modelKey] = event.target.checked;
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
              if (vnode.context.hasOwnProperty(modelKey)) {
                vnode.context[modelKey] = event.target.value;
              }
            });
            break;

          case 'checkbox':
            if (binding.value.includes(el.value)) {
              el.checked = true;
            }
            vnode.child.$on('change', event => {
              if (vnode.context.hasOwnProperty(modelKey)) {
                if (vnode.context[modelKey].includes(event.target.value)) {
                  vnode.context[modelKey].splice(vnode.context[modelKey].indexOf(event.target.value), 1);
                }
                else {
                  vnode.context[modelKey].push(event.target.value);
                }
              }
            });
            break;

          default:
            el.value = binding.value;
            if (Object.keys(binding.modifiers).length > 0 && binding.modifiers.hasOwnProperty('lazy')) {
              vnode.child.$on('change', event => {
                if (vnode.context.hasOwnProperty(modelKey)) {
                  vnode.context[modelKey] = formatOutput(binding.modifiers, event.target.value);
                }
              });
            }
            else {
              vnode.child.$on('input', event => {
                if (vnode.context.hasOwnProperty(modelKey)) {
                  vnode.context[modelKey] = formatOutput(binding.modifiers, event.target.value);
                }
              });
            }
        }
        break;
        
      case 'ons-range':
        el.value = binding.value;
        if (Object.keys(binding.modifiers).length > 0 && binding.modifiers.hasOwnProperty('lazy')) {
          vnode.child.$on('change', event => {
            if (vnode.context.hasOwnProperty(modelKey)) {
              vnode.context[modelKey] = formatOutput(binding.modifiers, event.target.value);
            }
          });
        }
        else {
          vnode.child.$on('input', event => {
            if (vnode.context.hasOwnProperty(modelKey)) {
              vnode.context[modelKey] = formatOutput(binding.modifiers, event.target.value);
            }
          });
        }
        break;
    }
  },

  update(el, binding, vnode) {
    let modelKey = binding.expression.trim();

    switch (vnode.elm.localName) {

      case 'ons-switch':
        if (binding.value !== el.checked) {
          el.checked = binding.value;
        }
        break;

      case 'ons-input':
        switch (el.type) {

          case 'radio':
            if (vnode.context.hasOwnProperty(modelKey) && vnode.context[modelKey] !== el.value) {
              el.checked = false;
            }
            break;

          case 'checkbox':
            if (vnode.context.hasOwnProperty(modelKey) && !vnode.context[modelKey].includes(el.value)) {
              el.checked = false;
            }
            break;
        }
        break;
    }
  }
};
