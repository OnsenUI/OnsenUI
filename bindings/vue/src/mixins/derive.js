import Vue from 'vue';
import { getClassFromTag, eventToHandler } from '../internal/util';
import { createMethodsFor, createComputedPropertiesFor } from '../internal/optionsObjectHelper';

const deriveEvents = {
  beforeCreate() {
    this._boundEvents = getClassFromTag(this.$options._componentTag.slice(2)).events || ['click'];
    this.$options.methods = {
      ...this._boundEvents.reduce((result, key) => {
        result[eventToHandler(key)] = event => this.$emit(key, event);
        return result;
      }, {}),
      ...this.$options.methods
    };
  },

  mounted() {
    this._boundEvents.forEach(key => {
      this.$el.addEventListener(key, this[eventToHandler(key)]);
    });
  },

  beforeDestroy() {
    this._boundEvents.forEach(key => {
      this.$el.removeEventListener(key, this[eventToHandler(key)]);
    });
    this._boundEvents = null;
  }
};

// Deprecated
const deriveMethods = {
  beforeCreate() {
    this.$options.methods = {
      ...createMethodsFor(getClassFromTag(this.$options._componentTag.slice(2))),
      ...this.$options.methods
    };
  }
};

const deriveHandlers = {
  beforeCreate() {
    const derivedProperties = createComputedPropertiesFor(getClassFromTag(this.$options._componentTag.slice(2)));

    this._propertyHandlers = Object.keys(derivedProperties).filter(propertyName => /^on[A-Z]/.test(propertyName));
  },

  mounted() {
    const dbb = 'onDeviceBackButton';
    this._propertyHandlers.forEach(propertyName => {
      const eventName = propertyName.slice(2).charAt(0).toLowerCase() + propertyName.slice(2).slice(1);

      if (propertyName === dbb) {
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

      } else if (!this.$el[propertyName]) {
        // If there is no default value, emit event
        this.$el[propertyName] = (...args) => this.$emit(eventName, ...args);
      }
    });
  }
};

export { deriveEvents, deriveHandlers };
