import * as components from './components';
import { hyphenate } from './internal/util';

import ons from 'onsenui';

const register = (Vue, type, items) => {
  Object.keys(items).forEach((key) => {
    const value = items[key];
    key = hyphenate(key);
    Vue[type](key, value);
  });
};

const install = (Vue, params = {}) => {
  /**
   * Register components of vue-onsenui.
   */
  register(Vue, 'component', components);

  /**
   * Apply a mixin globally to prevent ons-* elements
   * from being included directly in Vue instance templates.
   *
   * Note: This affects every Vue instance only when warns
   * are allowed by Vue.
   */
  if (!Vue.config.silent) {
    Vue.mixin({
      beforeCreate() {
        if (this.$options.template) {
          const match = this.$options.template.match(/<(ons-[\w-]+)/im);

          if (match) {
            const location = this.$options._componentTag ? ` in component <${this.$options._componentTag}>` : '';
            ons._util.warn('[vue-onsenui] Vue templates must not contain <ons-*> elements directly.\n' +
              `<${match[1]}> element found near index ${match.index}${location}. Please use <v-${match[1]}> instead:
              ${this.$options.template}`
            );
          }
        }
      }
    });
  }

  /**
   * Expose ons object.
   */
  Vue.prototype.$ons = Object.keys(ons)
    .filter(k => [
      /^disable/,
      /^enable/,
      /^open/,
      /^set/,
      /animit/,
      /Element$/,
      /fastClick/,
      /GestureDetector/,
      /notification/,
      /orientation/,
      /platform/,
      /ready/,
    ].some(t => k.match(t)))
    .reduce((r, k) => {
      r[k] = ons[k];
      return r;
    }, { _ons: ons });
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use({install});
}

export default install;
