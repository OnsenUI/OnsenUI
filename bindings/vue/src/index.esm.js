import { $ons } from './setup';

$ons.install = (Vue, params = {}) => {
  /**
   * Expose ons object.
   */
  Vue.prototype.$ons = $ons;
};

export default $ons;
