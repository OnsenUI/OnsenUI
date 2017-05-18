import SimpleWrapper from './SimpleWrapper.jsx';
import PropTypes from 'prop-types';

/**
 * @original ons-bottom-toolbar
 * @category page
 * @description
 * [en]Toolbar component that is positioned at the bottom of the page.[/en]
 * [ja][/ja]
 * @example
 * <BottomToolbar modifier="material"> Content </BottomToolbar>
 */
class BottomToolbar extends SimpleWrapper {
  _getDomNodeName() {
    return 'ons-bottom-toolbar';
  }
}

BottomToolbar.propTypes = {
  /**
   * @name modifier
   * @type string
   * @description
   *  [en]Specify modifier name to specify custom styles. Optional.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string
};

export default BottomToolbar;
