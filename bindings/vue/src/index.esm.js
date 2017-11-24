import ons from 'onsenui/esm';
import setup from './setup';

const $ons = setup(ons);

$ons.install = (Vue, params = {}) => {
  /**
   * Expose ons object.
   */
  Vue.prototype.$ons = $ons;
};

export default $ons;
