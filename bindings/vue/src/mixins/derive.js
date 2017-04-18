import { eventToHandler, handlerToProp } from '../internal/util';

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
  mounted() {
    this._handlers = {};
    this._boundEvents = this.$el.constructor.events || [];

    this._boundEvents.forEach(key => {
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
    this._boundEvents.forEach(key => {
      this.$el.removeEventListener(key, this._handlers[eventToHandler(key)]);
    });
    this._handlers = this._boundEvents = null;
  }
};

export { deriveDBB, deriveHandler, deriveEvents };
