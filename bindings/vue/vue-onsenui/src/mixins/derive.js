import ons from 'onsenui';

import { camelize, eventToHandler, handlerToProp, capitalize } from '../internal/util';

/* Private */
const _setupDBB = component => {
  const dbb = 'onDeviceBackButton';
  // Call original handler or parent handler by default
  const handler = component[dbb] || (component.$el[dbb] && component.$el[dbb]._callback) || (e => e.callParentHandler());

  component.$el[dbb] = event => {
    let runDefault = true;

    component.$emit(handlerToProp(dbb), {
      ...event,
      preventDefault: () => runDefault = false
    });

    runDefault && handler(event);
  };

  component._isDBBSetup = true;
};

/* Public */
// Device Back Button Handler
const deriveDBB = {
  mounted() {
    _setupDBB(this);
  },

  // Core destroys deviceBackButton handlers on disconnectedCallback.
  // This fixes the behavior for <keep-alive> component.
  activated() {
    this._isDBBSetup === false && _setupDBB(this);
  },

  deactivated() {
    this._isDBBSetup === true && (this._isDBBSetup = false);
  },

  unmounted() {
    this.$el.onDeviceBackButton && this.$el.onDeviceBackButton.destroy();
  }
};

const deriveEvents = elementName => ({
  emits: ons.elements[capitalize(camelize(elementName.slice(6)))].events,

  computed: {
    unrecognizedListeners() {
      const name = camelize('-' + this.$options.name.slice(6));
      const listeners = Object.fromEntries(Object.entries(this.$attrs)
        .filter(([attribute, handler]) => /^on[^a-z]/.test(attribute)));
      return Object.keys(listeners || {})
        .filter(k => (this.$ons.elements[name].events || []).indexOf(k) === -1)
        .reduce((r, k) => {
          r[k] = listeners[k];
          return r;
        }, {});
    }
  },

  mounted() {
    this._handlers = {};

    (this.$el.constructor.events || []).forEach(key => {
      this._handlers[eventToHandler(key)] = event => {
        // Filter events from different components with the same name
        if (event.target === this.$el || !/^ons-/i.test(event.target.tagName)) {
          this.$emit(key, event);
        }
      };
      this.$el.addEventListener(key, this._handlers[eventToHandler(key)]);
    });
  },

  beforeUnmount() {
    Object.keys(this._handlers).forEach(key => {
      this.$el.removeEventListener(key, this._handlers[key]);
    });
    this._handlers = null;
  }
});

export { deriveDBB, deriveEvents };
