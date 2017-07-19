import { capitalize, camelize, eventToHandler, handlerToProp } from '../internal/util';

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

  destroyed() {
    this.$el.onDeviceBackButton && this.$el.onDeviceBackButton.destroy();
  }
};

// These handlers cannot throw events for performance reasons.
const deriveHandler = handlerName => {
  const propName = handlerToProp(handlerName);

  return {
    props: {
      [propName]: {
        type: Function,
        default: null
      }
    },

    watch: {
      [propName]() {
        this.$el[handlerName] = this[propName];
      }
    },

    mounted() {
      this[propName] && (this.$el[handlerName] = this[propName]);
    }
  };
};

const deriveEvents = {
  computed: {
    unrecognizedListeners() {
      const element = capitalize(camelize(this.$options._componentTag.slice(6))) + 'Element';
      return Object.keys(this.$listeners || {})
        .filter(k => (this.$ons[element].events || []).indexOf(k) === -1)
        .reduce((r, k) => {
          r[k] = this.$listeners[k];
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

  beforeDestroy() {
    Object.keys(this._handlers).forEach(key => {
      this.$el.removeEventListener(key, this._handlers[key]);
    });
    this._handlers = null;
  }
};

export { deriveDBB, deriveHandler, deriveEvents };
