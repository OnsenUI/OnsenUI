import BasicComponent from './BasicComponent.jsx';
import React from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import Util from './Util.js';
import 'onsenui/esm/elements/ons-segment';

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
class Segment extends BasicComponent {
  constructor(...args) {
    super(...args);

    this.onPostChange = (event) => {
      if (this.props.onPostChange) {
        return this.props.onPostChange(event);
      }
    };
  }

  _getDomNodeName() {
    return 'ons-segment';
  }

  componentDidMount() {
    super.componentDidMount();
    const node = findDOMNode(this);

    node.addEventListener('postchange', this.onPostChange);
  }

  componentWillUnmount() {
    const node = findDOMNode(this);

    node.removeEventListener('postchange', this.onPostChange);
  }

  shouldComponentUpdate() {
    return false;
  }

  UNSAFE_componentWillReceiveProps(props) {
    const node = findDOMNode(this);

    if (this.props.index !== props.index && props.index !== node.getActiveButtonIndex()) {
      node.setActiveButton(props.index, { reject: false });
    }
  }

  render() {
    const attrs = Util.getAttrs(this, this.props, { index: 'active-index' });
    return React.createElement(this._getDomNodeName(), attrs, this.props.children);
  }
}

Segment.propTypes = {
  /**
   * @name index
   * @type number
   * @required
   * @description
   *  [en] The index of the button to highlight.[/en]
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
  onPostChange: PropTypes.func
};

export default Segment;
