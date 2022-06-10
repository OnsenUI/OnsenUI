import ons from 'onsenui';
import setup from './setup.js';

const $ons = setup(ons);

$ons.install = app => {
  /**
   * Expose ons object.
   */
  $ons._app = app;
  app.config.globalProperties.$ons = $ons;
};

export default $ons;
