import { $ons } from './setup';

const install = (Vue, params = {}) => {
  /**
   * Expose ons object.
   */
  Vue.prototype.$ons = $ons
};

export default {
  $ons,
  install,
};
