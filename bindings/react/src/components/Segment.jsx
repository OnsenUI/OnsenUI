import SimpleWrapper from './SimpleWrapper.jsx';
import React from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import Util from './Util.js';

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
class Segment extends SimpleWrapper {

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
    var node = findDOMNode(this);

    node.addEventListener('postchange', this.onPostChange);
  }

  componentWillUnmount() {
    var node = findDOMNode(this);

    node.removeEventListener('postchange', this.onPostChange);
  }

  componentWillReceiveProps(props) {
    const node = findDOMNode(this);

    if (this.props.index !== props.index) {
      node.setActiveButton(props.index, {animation: props.animation, animationOptions: props.animationOptions});
    }
  }

  render() {
    const {...others} = this.props;

    Util.convert(others, 'index', {newName: 'active-index'});
    Util.convert(others, 'tabbarId', {newName: 'tabbar-id'});

    return React.createElement(this._getDomNodeName(), others, this.props.children);
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
   * @name animation
   * @type string
   * @description
   *  [en] Animation name for a connected tabbar. Available values are `"none"`, `"slide"` and `"fade"`. Default is `"none"`. [/en]
   *  [ja][/ja]
   */
  animation: PropTypes.oneOf(['none', 'slide', 'fade']),

  /**
   * @name animationOptions
   * @type object
   * @required false
   * @description
   *  [en]Specify the connected tabbar animation's duration, delay and timing. E.g. `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *  [ja][/ja]
   */
  animationOptions: PropTypes.object,

  /**
   * @name onChange
   * @type function
   * @description
   *  [en] Called when the active button changes.[/en]
   *  [ja][/ja]
   */
  onPostChange: PropTypes.func
};

export default Segment;
