import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import SimpleWrapper from './SimpleWrapper.jsx';
import 'onsenui/esm/elements/ons-list-item';

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
class ListItem extends SimpleWrapper {
  _getDomNodeName() {
    return 'ons-list-item';
  }

  componentDidMount() {
    super.componentDidMount();
    this.node = ReactDOM.findDOMNode(this);
    this.node.expanded = this.props.expanded === true;
    if (this.node.expanded) {
      this.node.classList.add('expanded');
    }
  }

  componentDidUpdate() {
    super.componentDidUpdate();

    if (this.props.expanded !== this.node.expanded) {
      const action = this.props.expanded ? 'show' : 'hide';
      this.node[action + 'Expansion']();
    }
  }
}

ListItem.propTypes = {
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
  expanded: PropTypes.bool
};

export default ListItem;
