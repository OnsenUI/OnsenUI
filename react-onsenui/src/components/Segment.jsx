import PropTypes from 'prop-types';
import 'onsenui/esm/elements/ons-segment';

import onsCustomElement from '../onsCustomElement';

const deprecated = {
  index: 'activeIndex'
};

/**
 * @original ons-segment
 * @category control
 * @tutorial react/Reference/segment
 * @description
 * [en]
 *   Segment component.
 * [/en]
 * [ja][/ja]
 * @example
 * <Segment modifier="material">
 *  <button>Label 1</button>
 *  <button>Label 2</button>
 *  <button>Label 3</button>
 * </Segment>
 */
const Segment = onsCustomElement('ons-segment', {deprecated});

Segment.propTypes = {
  /**
   * @name activeIndex
   * @type number
   * @description
   *  [en]The index of the button to highlight.[/en]
   *  [ja][/ja]
   */
  activeIndex: PropTypes.number,

  /**
   * @name index
   * @type number
   * @description
   *  [en]DEPRECATED! Use `activeIndex` instead.[/en]
   *  [ja][/ja]
   */
  index: PropTypes.number,

  /**
   * @name tabbarId
   * @type string
   * @description
   *  [en] ID of the `<Tabbar>` to "connect" to the segment. [/en]
   *  [ja][/ja]
   */
  tabbarId: PropTypes.string,

  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the segment.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name onPostChange
   * @type function
   * @description
   *  [en] Called after the active button changes.[/en]
   *  [ja][/ja]
   */
  onPostChange: PropTypes.func,

  /**
   * @name disabled
   * @type boolean
   * @description
   *   [en]Specifies whether the segment should be disabled.[/en]
   *   [ja][/ja]
   */
  disabled: PropTypes.bool
};

export default Segment;
