import Vue from 'vue';
import { hyphenate, getClassFromTag, eventToHandler } from '../util';
import { createMethodsFor, createComputedPropertiesFor } from '../optionsObjectHelper';

const deriveEvents = {
  beforeCreate() {
    this._boundEvents = getClassFromTag(this.$options._componentTag.slice(2)).events || ['click'];
    this.$options.methods = Object.assign({}, this._boundEvents.reduce((result, key) => {
      result[eventToHandler(key)] = event => this.$emit(key, event);
      return result;
    }, {}));
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

const deriveMethods = {
  beforeCreate() {
    this.$options.methods = Object.assign({}, createMethodsFor(getClassFromTag(this.$options._componentTag.slice(2))), this.$options.methods);
  }
};

const deriveProperties = {
  beforeCreate() {
    this.$options.computed = Object.assign({}, createComputedPropertiesFor(getClassFromTag(this.$options._componentTag.slice(2))), this.$options.computed);
  }
};

export { deriveEvents, deriveMethods, deriveProperties };
