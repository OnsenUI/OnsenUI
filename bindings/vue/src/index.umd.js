import { $ons } from './setup';
import { hyphenate } from './internal/util';
import * as components from './components';

const install = (Vue, params = {}) => {
  /**
   * Register components of vue-onsenui.
   */
  Object.keys(components).forEach(key => Vue.component(hyphenate(key), components[key]));

  /**
   * Expose ons object.
   */
  Vue.prototype.$ons = $ons;
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use({install});
}

export default {
  $ons,
  install,
};
