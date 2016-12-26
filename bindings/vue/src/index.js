import * as components from './components';

import ons from 'onsenui';

const registerComponents = (Vue, comps) => {
  Object.keys(comps).forEach((key) => {
    const value = comps[key];
    key = Vue.util.hyphenate(key);
    Vue.component(key, value);
  });
};

const install = (Vue, params = {}) => {
  /**
   * Register components of vue-onsenui.
   */
  registerComponents(Vue, components);

  /**
   * Push a page to parent Navigator.
   */
  Vue.prototype.$push = function(options) {
    this.$dispatch('push', options);
  };

  /**
   * Pop a page from the parent Navigator.
   */
  Vue.prototype.$pop = function(options) {
    this.$dispatch('pop', options);
  }

  /**
   * Expose notification methods.
   */
  Vue.prototype.$notification = ons.notification;

  /**
   * Expose platform methods.
   */
  Vue.prototype.$platform = ons.platform;
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use({install});
}

export default install;
