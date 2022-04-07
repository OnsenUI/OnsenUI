import PropTypes from 'prop-types';
import 'onsenui/esm/elements/ons-bottom-toolbar';

import onsCustomElement from '../onsCustomElement';

const propTypes = {
  /**
   * @name modifier
   * @type string
   * @description
   *  [en]Specify modifier name to specify custom styles. Optional.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string
};

/**
 * @original ons-bottom-toolbar
 * @category page
 * @description
 * [en]Toolbar component that is positioned at the bottom of the page.[/en]
 * [ja][/ja]
 * @example
 * <BottomToolbar modifier="material"> Content </BottomToolbar>
 */
const BottomToolbar = onsCustomElement('ons-bottom-toolbar', {propTypes});
BottomToolbar.propTypes = propTypes;

export default BottomToolbar;
