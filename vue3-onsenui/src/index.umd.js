import ons from 'onsenui';
import setup from './setup.js';
import * as components from './components/index.js';

const $ons = setup(ons);

$ons.install = app => {
  /**
   * Register components of vue-onsenui.
   */
  Object.keys(components)
    .forEach(key => app.component(components[key].name, components[key]));

  /**
   * Expose ons object.
   */
  $ons._app = app;
  app.config.globalProperties.$ons = $ons;
};

export default $ons;
