/* Private */
const _isLiteral = e => e.trim().charAt(0) === '{';
const _validateLiteral = o => {
  if (!Object.hasOwnProperty.call(o, 'container')
   || !Object.hasOwnProperty.call(o, 'key')
  ) {
    throw Error(`Object literals in VOnsModel must include 'key' and 'container' properties.`);
  }
}

const _getModel = (binding, context, newValue) => {
  const expression = (binding.expression || '').trim();

  // Object literal
  if (_isLiteral(expression)) {
    _validateLiteral(binding.value);

    if (newValue !== undefined && binding.value.container[binding.value.key] !== newValue) {
      context.$set(binding.value.container, binding.value.key, newValue); // Setter
    }

    return binding.value.container[binding.value.key]; // Getter
  }

  const path = expression.split('.');
  const lastKey = path.pop();

  let key, model = context;
  while (key = path.shift()) { // eslint-disable-line no-cond-assign
    model = model[key];
  }

  if (newValue !== undefined && model[lastKey] !== newValue) {
    context.$set(model, lastKey, newValue); // Setter
  }

  return model[lastKey] || binding.value; // Getter
};

const _setModel = _getModel;

const _formatOutput = (modifiers = {}, output) => {
  if (Object.hasOwnProperty.call(modifiers, 'number')) {
    return Number(output);
  }
  if (Object.hasOwnProperty.call(modifiers, 'trim')) {
    return output.trim();
  }
  return output;
};

const _bindOn = (eventName, binding, vnode, handler) => {
  const expression = (binding.expression || '').trim();
  if (_isLiteral(expression) || vnode.context.hasOwnProperty(expression.split('.')[0])) {
    vnode.child.$on(eventName, handler);
  }
};

const _bindSimpleInputOn = (eventName, binding, vnode, propName) => {
  _bindOn(eventName, binding, vnode, event => {
    _setModel(binding, vnode.context, event.target[propName]);
  });
};

const _bindModifierInputOn = (eventName, binding, vnode) => {
  _bindOn(eventName, binding, vnode, event => {
    _setModel(binding, vnode.context, _formatOutput(binding.modifiers, event.target.value));
  });
};

const _bindArrayInputOn = (eventName, binding, vnode) => {
  _bindOn(eventName, binding, vnode, event => {
    let modelValue = _getModel(binding, vnode.context);
    const index = modelValue.indexOf(event.target.value);

    if (index >= 0) {
      !event.target.checked && _setModel(binding, vnode.context, [
        ...modelValue.slice(0, index),
        ...modelValue.slice(index + 1, modelValue.length)
      ]);
    } else {
      event.target.checked && _setModel(binding, vnode.context, [ ...modelValue, event.target.value ]);
    }

    modelValue = null;
  });
};

const _bindCheckbox = (el, binding, vnode) => {
  const value = _getModel(binding, vnode.context);
  if (value instanceof Array) {
    el.checked = value.indexOf(el.value) >= 0;
    _bindArrayInputOn('change', binding, vnode);
  } else {
    el.checked = !!value;
    _bindSimpleInputOn('change', binding, vnode, 'checked');
  }
};

const _updateCheckbox = (el, binding, vnode) => {
  const value = _getModel(binding, vnode.context);
  if (value instanceof Array) {
    el.checked = value.indexOf(el.value) >= 0;
  } else {
    el.checked = !!value;
  }
};


/* Public */

// VOnsModel directive
export default {
  bind(el, binding, vnode) {
    const tag = el.tagName.toLowerCase();
    const value = _getModel(binding, vnode.context);

    switch (tag) {
      case 'ons-radio':
        el.checked = el.value === value;
        _bindSimpleInputOn('change', binding, vnode, 'value');
        break;

      case 'ons-switch':
      case 'ons-checkbox':
        _bindCheckbox(el, binding, vnode);
        break;

      case 'ons-input':
      case 'ons-range':
      case 'ons-search-input':
        el.value = value;
        _bindModifierInputOn(Object.hasOwnProperty.call(binding.modifiers, 'lazy') ? 'change' : 'input', binding, vnode);
        break;

      case 'ons-select':
        el.querySelector('option[value=' + value + ']').setAttribute('selected', '');
        _bindSimpleInputOn('change', binding, vnode, 'value');
        break;

      default:
        throw new Error('"v-ons-model" directive cannot be used with "' + tag + '" element.');
    }
  },

  /*
   * Caution:
   * This hook is called every time the view changes since
   * the directive's value is updated in the event handlers.
   *
   * Also, this is called on -every- update, not only when
   * the corresponding value changes. Therefore, it must
   * check if the current value has changed manually.
   */
  update(el, binding, vnode) {
    const tag = el.tagName.toLowerCase();
    const value = _getModel(binding, vnode.context);

    switch (tag) {
      case 'ons-radio':
        el.checked = value === el.value;
        break;

      case 'ons-switch':
      case 'ons-checkbox':
        _updateCheckbox(el, binding, vnode);
        break;

      case 'ons-input':
      case 'ons-range':
      case 'ons-select':
      case 'ons-search-input':
        el.value !== value && (el.value = value);
        break;
    }
  }
};
