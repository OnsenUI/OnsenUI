import ons from 'onsenui';
import setup from './setup';
import * as components from './components';

const $ons = setup(ons);

$ons.install = (Vue, params = {}) => {
  /**
   * Register components of vue-onsenui.
   */
  Object.keys(components)
    .forEach(key => Vue.component(components[key].name, components[key]));

  /**
   * Expose ons object.
   */
  Vue.prototype.$ons = $ons;
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use({ install: $ons.install });
}

export default $ons;
