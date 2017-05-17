import ReactDOM from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';
import SimpleWrapper from './SimpleWrapper.jsx';
import Util from './Util.js';

/**
 * @original ons-list-item
 * @category list
 * @tutorial react/Reference/list
 * @description
 *   [en]
 *   Component that represents each item in the list. Must be put inside the `List` component. The list item is composed of three parts that are represented with the `left`, `center` and `right` classes. These classes can be used to ensure that the content of the list items is properly aligned.
 *   [/en]
 * [ja][/ja]
 * @example
   <ListItem>
 *   <div className="left">Left</div>
 *   <div className="center">Center</div>
 *   <div className="right">Right</div>
 * </ListItem>
 */
class ListItem extends SimpleWrapper {
  _getDomNodeName() {
    return 'ons-list-item';
  }

  componentDidMount() {
    super.componentDidMount();
    this.node = ReactDOM.findDOMNode(this);
  }

  componentDidUpdate() {
    super.componentDidUpdate();
    this.node._compile();
  }

  render() {
    var {...others} = this.props;

    Util.convert(others, 'tappable');
    Util.convert(others, 'tapBackgroundColor', {newName: 'tap-background-color'});
    Util.convert(others, 'lockOnDrag', {newName: 'lock-on-drag'});

    return React.createElement(this._getDomNodeName(), others, this.props.children);
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
  lockOnDrag: PropTypes.bool
};

export default ListItem;
