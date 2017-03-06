import Vue from 'vue';
import { eventToHandler } from '../internal/util';
import { getHandlers } from '../internal/optionsObjectHelper';

const deriveEvents = {
  mounted() {
    this._handlers = {};
    this._boundEvents = this.$el.constructor.__proto__.events || [];

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

const deriveHandlers = {
  mounted() {
    const dbb = 'onDeviceBackButton';

    getHandlers(this.$el.constructor.__proto__).forEach(propName => {
      const eventName = propName.slice(2).charAt(0).toLowerCase() + propName.slice(2).slice(1);

      if (propName === dbb) {
        // Call original handler or parent handler by default
        const handler = (this.$el[dbb] && this.$el[dbb]._callback) || (e => e.callParentHandler());

        this.$el[dbb] = event => {
          const id = setTimeout(handler.bind(this.$el, event), 0);
          this.$emit(eventName, {
            ...event,
            preventDefault: () => clearTimeout(id)
          });
        };

      } else if (!this.$el[propName]) {
        // If there is no default value, emit event
        this.$el[propName] = (...args) => this.$emit(eventName, ...args);
      }
    });
  }
};

export { deriveEvents, deriveHandlers };
