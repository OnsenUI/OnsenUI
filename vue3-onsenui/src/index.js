import ons from 'onsenui/esm';
import setup from './setup';

const $ons = setup(ons);

$ons.install = app => {
  /**
   * Expose ons object.
   */
  $ons._app = app;
  app.config.globalProperties.$ons = $ons;
};

export default $ons;
