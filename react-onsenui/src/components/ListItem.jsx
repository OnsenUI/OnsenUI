import PropTypes from 'prop-types';
import 'onsenui/esm/elements/ons-list-item';

import onsCustomElement from '../onsCustomElement';

const propTypes = {
  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en] The appearance of the list item.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name tappable
   * @type bool
   * @description
   *  [en]
   *  Specifies whether the list item is tappable.
   *  [/en]
   *  [ja][/ja]
   */
  tappable: PropTypes.bool,

  /**
   * @name tapBackgroundColor
   * @type string
   * @description
   *  [en]
   *  Changes the background color when tapped. For this to work, the attribute "tappable" needs to be set. The default color is "#d9d9d9". It will display as a ripple effect on Android.
   *  [/en]
   *  [ja][/ja]
   */
  tapBackgroundColor: PropTypes.string,

  /**
   * @name lockOnDrag
   * @type bool
   * @description
   *  [en] Prevent vertical scrolling when the user drags horizontally. [/en]
   *  [ja][/ja]
   */
  lockOnDrag: PropTypes.bool,

  /**
   * @name expandable
   * @type bool
   * @description
   *  [en]Specifies whether list item can be expanded to reveal hidden content. Expanded content must be defined in `div.expandable-content`.[/en]
   *  [ja][/ja]
   */
  expandable: PropTypes.bool,

  /**
   * @name expanded
   * @type bool
   * @description
   *  [en]For expandable list items, specifies whether item is expanded[/en]
   *  [ja][/ja]
   */
  expanded: PropTypes.bool,

  /**
   * @name onExpand
   * @type function
   * @description
   *  [en] This function will be called when the expandable list item expands or contracts.[/en]
   *  [ja][/ja]
   */
  onExpand: PropTypes.func,

  /**
   * @name animation
   * @type string
   * @description
   *  [en]The animation used when showing and hiding the expandable content. Can be either "default" or "none".[/en]
   *  [ja][/ja]
   */
  animation: PropTypes.string
};

/**
 * @original ons-list-item
 * @category list
 * @tutorial react/Reference/list
 * @description
 *   [en]
 *   Component that represents each item in the list. Must be put inside the `List` component. The list item is composed of four parts that are represented with the `left`, `center`, `right` and `expandable-content` classes. These classes can be used to ensure that the content of the list items is properly aligned.
 *   [/en]
 * [ja][/ja]
 * @example
   <ListItem>
 *   <div className="left">Left</div>
 *   <div className="center">Center</div>
 *   <div className="right">Right</div>
 *   <div className="expandable-content">Expandable content</div>
 * </ListItem>
 */
const ListItem = onsCustomElement('ons-list-item', {propTypes});
ListItem.propTypes = propTypes;

export default ListItem;
