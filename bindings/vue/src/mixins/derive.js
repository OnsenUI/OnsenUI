import Vue from 'vue';
import { eventToHandler } from '../internal/util';
import { createComputedPropertiesFor } from '../internal/optionsObjectHelper';

const deriveEvents = {
  mounted() {
    this._handlers = {};
    this._boundEvents = this.$el.constructor.__proto__.events || ['click'];

    this._boundEvents.forEach(key => {
      this._handlers[eventToHandler(key)] = event => this.$emit(key, event);
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

const deriveHandlers = {
  mounted() {
    const dbb = 'onDeviceBackButton';
    const nativeProps = createComputedPropertiesFor(this.$el.constructor.__proto__);
    const propHandlers = Object.keys(nativeProps).filter(propName => /^on[A-Z]/.test(propName));

    propHandlers.forEach(propName => {
      const eventName = propName.slice(2).charAt(0).toLowerCase() + propName.slice(2).slice(1);

      if (propName === dbb) {
        // Call original handler or parent handler by default
        const handler = (this.$el[dbb] && this.$el[dbb]._callback) || (e => e.callParentHandler());

        this.$el[dbb] = event => {
          const id = setTimeout(handler.bind(this.$el, event), 0);
          const newEvent = {
            ...event,
            preventDefault: () => clearTimeout(id)
          };
          this.$emit(eventName, newEvent);
        };

      } else if (!this.$el[propName]) {
        // If there is no default value, emit event
        this.$el[propName] = (...args) => this.$emit(eventName, ...args);
      }
    });
  }
};

export { deriveEvents, deriveHandlers };
