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
   * Apply a mixin globally to prevent ons-* elements
   * from being included directly in Vue instance templates.
   *
   * Note: This affects every Vue instance.
   */
  Vue.mixin({
    methods: {
      getComponent(query) {
        if (query.startsWith('v-')) {
          query = name.slice(2);
        }
        return ons._util.findParent(this.$el, query).__vue__;
      },
      getTabbar() {
        return this.getComponent('ons-tabbar');
      },
      getNavigator() {
        return this.getComponent('ons-navigator');
      },
      getSplitter() {
        return this.getComponent('ons-splitter');
      }
    },

    beforeMount() {
      // When this beforeMount hook is called, this.$el has not yet replaced by Vue.
      // So we can detect whether or not any custom elements exist in the template of the Vue instance.
      if (this.$el) { // if vm.$mount is called with no arguments, this.$el will be undefined
        // count ons-* elements in this.$el
        const countOfOnsElements = Array.prototype.slice.call(this.$el.querySelectorAll('*')).filter(
          (element) => {
            return /^ons-.+/i.test(element.tagName); // Note: in HTML document, Element#tagName returns a capitalized tag name
          }
        ).length;

        if (countOfOnsElements > 0) {
          console.error(`[vue-onsenui] Vue templates must not contain ons-* elements directly.`);
        }
      }
    }
  });

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
