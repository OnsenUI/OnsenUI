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
    this._propertyHandlers.forEach(propertyName => {
      if (!this.$el[propertyName]) {
        this.$el[propertyName] = (...args) => {
          const name = propertyName.slice(2);
          this.$emit(name.charAt(0).toLowerCase() + name.slice(1), ...args);
        };
      }
    });
  }
};

export { deriveEvents, deriveHandlers };
