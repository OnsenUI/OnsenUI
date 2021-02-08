import ons from 'onsenui/esm';
import setup from './setup';

const $ons = setup(ons);

$ons.install = Vue => {
  /**
   * Expose ons object.
   */
  Vue.prototype.$ons = $ons;
};

export default $ons;
