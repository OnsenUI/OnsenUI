import Vue from 'vue';
import { hyphenate, getClassFromTag, eventToHandler } from '../internal/util';
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

const deriveProperties = {
  beforeCreate() {
    this._propertyHandlers = [];
    let derivedProperties = createComputedPropertiesFor(getClassFromTag(this.$options._componentTag.slice(2)));

    derivedProperties = Object.keys(derivedProperties).reduce((result, propertyName) => {
      if (/^on[A-Z]/.test(propertyName)) {
        this._propertyHandlers.push(propertyName);
      } else {
        result[propertyName] = derivedProperties[propertyName];
      }
      return result;
    }, {});

    this.$options.computed = {
      ...derivedProperties,
      ...this.$options.computed
    };
  },

  mounted() {
    this._propertyHandlers.forEach(propertyName => {
      this.$el[propertyName] = (...args) => {
        const name = propertyName.slice(2);
        this.$emit(name.charAt(0).toLowerCase() + name.slice(1), ...args);
      };
    });
  }
};

export { deriveEvents, deriveProperties };
