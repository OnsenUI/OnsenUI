import ons from 'onsenui';
import setup from './setup';
import * as components from './components';

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
  app.config.globalProperties.$ons = $ons;
};

export default $ons;
