import PropTypes from 'prop-types';
import 'onsenui/esm/elements/ons-tab';

import onsCustomElement from '../onsCustomElement';

/**
 * @original ons-tab
 * @category tabbar
 * @tutorial react/Reference/tabbar
 * @description
 * [en] Represents a tab inside tab bar.
 [/en]
 * [ja][/ja]
 * @example
 * <Tap>
 *   Home
 * </Tap>
 */
const Tab = onsCustomElement('ons-tab');

Tab.propTypes = {
  /**
   * @name icon
   * @type string
   * @description
   *  [en]The icon name for the tab. Can specify the same icon name as <ons-icon>.[/en]
   *  [ja][/ja]
   */
  icon: PropTypes.string,

  /**
   * @name activeIcon
   * @type string
   * @description
   *  [en]The name of the icon when the tab is active.[/en]
   *  [ja][/ja]
   */
  activeIcon: PropTypes.string,

  /**
   * @name label
   * @type string
   * @description
   *  [en]The label of the tab item.[/en]
   *  [ja][/ja]
   */
  label: PropTypes.string,

  /**
   * @name badge
   * @type string
   * @description
   *  [en]Display a notification badge on top of the tab.[/en]
   *  [ja][/ja]
   */
  badge: PropTypes.string
};

export default Tab;
