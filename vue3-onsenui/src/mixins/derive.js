import ons from 'onsenui';

import { camelize, eventToHandler, handlerToProp, capitalize } from '../internal/util.js';

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
  emits: ['deviceBackButton'],

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

  destroyed() {
    this.$el.onDeviceBackButton && this.$el.onDeviceBackButton.destroy();
  }
};

const deriveEvents = name => {

  const nativeEvents = ons.elements[capitalize(camelize(name.slice(6)))].events || [];

  return {
    emits: nativeEvents,

    mounted() {
      this._handlers = {};

      nativeEvents.forEach(key => {
        this._handlers[eventToHandler(key)] = event => {
          // Filter events from different components with the same name
          if (event.target === this.$el || !/^ons-/i.test(event.target.tagName)) {
            this.$emit(key, event);
          }
        };
        this.$el.addEventListener(key, this._handlers[eventToHandler(key)]);
      });
    },

    beforeDestroy() {
      Object.keys(this._handlers).forEach(key => {
        this.$el.removeEventListener(key, this._handlers[key]);
      });
      this._handlers = null;
    }
  };
};

const unrecognizedListeners = nativeElement => ({
  computed: {
    unrecognizedListeners() {
      const isListener = ([attribute]) => /^on[^a-z]/.test(attribute);
      const isUnknown = ([attribute]) => !nativeElement.events.includes(camelize(attribute.slice(2)))

      return Object.fromEntries(Object.entries(this.$attrs)
        .filter(attribute => isListener(attribute) && isUnknown(attribute)));
    }
  }
});

export { deriveDBB, deriveEvents, unrecognizedListeners };
