export {
  OnsNavigator,
  OnsBackButton,
  OnsTabbar,
  OnsSwitch,
  OnsPullHook,
  OnsSplitterSide
} from './components';

import ons from 'onsenui';

const registerComponents = (Vue, components) => {
	Object.keys(components).forEach((key) => {
		const value = components[key];
		key = Vue.util.hyphenate(key);
		Vue.component(key, value);
	});
};

const install = (Vue, params = {}) => {
	/**
	 * Register components used in Tabbar,
	 * Navigator and Splitter.
	 */
	registerComponents(Vue, params.components || {});

	/**
	 * Push a page to parent Navigator.
	 */
	Vue.prototype.$push = function(options) {
		this.$dispatch('push', options);
	};

	/**
	 * Pop a page from the parent Navigator.
	 */
	Vue.prototype.$pop = function(options) {
		this.$dispatch('pop', options);
	}

  /**
   * Expose notification methods.
   */
  Vue.prototype.$notification = ons.notification;

  /**
   * Expose platform methods.
   */
  Vue.prototype.$platform = ons.platform;
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use({install});
}

export default install;
