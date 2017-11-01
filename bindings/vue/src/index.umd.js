import { $ons } from './setup';
import * as components from './components';

const install = (Vue, params = {}) => {
  /**
   * Register components of vue-onsenui.
   */
  Object.values(components).forEach(c => Vue.component(c.name, c));

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
