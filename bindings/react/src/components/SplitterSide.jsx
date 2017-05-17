import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import BasicComponent from './BasicComponent.jsx';
import Util from './Util.js';

/**
 * @original ons-splitter-side
 * @category menu
 * @tutorial react/Reference/splitter
 * @description
 * [en]  The SplitterContent  element is used as a child element of Splitter.
 *    It contains the main content of the page while SplitterSide contains the list.
 [/en]
 * [ja][/ja]
 * @example
  <Splitter>
    <SplitterSide
      side="left"
      width={200}
      isSwipeable={true}>
      <Page> Page Left </Page>
    </SplitterSide>
    <SplitterContent>
      <Page> Page Content </Page>
    </SplitterContent>
    <SplitterSide
      side="right"
      width={300}
      collapse={!this.state.showRight}
      isOpen={this.state.openRight}
      onClose={this.handleRightClose.bind(this)}
      onOpen={this.handleRightOpen.bind(this)}
      isSwipeable={true}>
      <Page> Page Right </Page>
    </SplitterSide>
  </Splitter>
 */

class SplitterSide extends BasicComponent {

  constructor(...args) {
    super(...args);

    const callback = (name, event) => {
      if (this.props[name]) {
        return this.props[name](event);
      }
    };
    this.onOpen = callback.bind(this, 'onOpen');
    this.onClose = callback.bind(this, 'onClose');
    this.onPreOpen = callback.bind(this, 'onPreOpen');
    this.onPreClose = callback.bind(this, 'onPreClose');
    this.onModeChange = callback.bind(this, 'onModeChange');
  }

  render() {
    var {...props} = this.props;

    props.swipeable = this.props.isSwipeable ? 'swipeable' : null;

    if (this.props.isCollapsed) {
      console.error('The property `isCollapsed` is deprecated, please use `collapse`, see https://onsen.io/v2/docs/react/SplitterSide.html.');
      delete props['isCollapsed'];
    }

    if (!props.collapse) props.collapse = null;

    if (typeof props.collapse === 'boolean') {
      if (props.collapse) {
        props.collapse = 'collapse';
      } else {
        props.collapse = 'false';
      }
    }

    Util.convert(props, 'width', {fun: Util.sizeConverter});
    Util.convert(props, 'animation');
    Util.convert(props, 'side');
    Util.convert(props, 'mode');
    Util.convert(props, 'animationOptions', {fun: Util.animationOptionsConverter, newName: 'animation-options'});
    Util.convert(props, 'openThreshold', {newName: 'open-threshold'});
    Util.convert(props, 'swipeTargetWidth', {fun: Util.sizeConverter, newName: 'swipe-target-width'});

    return (
      <ons-splitter-side {...props} >
        {this.props.children}
      </ons-splitter-side>
    );
  }

  componentDidMount() {
    super.componentDidMount();
    this.node = ReactDOM.findDOMNode(this);
    this.componentWillReceiveProps(this.props);

    this.node.addEventListener('postopen', this.onOpen);
    this.node.addEventListener('postclose', this.onClose);
    this.node.addEventListener('preopen', this.onPreOpen);
    this.node.addEventListener('preclose', this.onPreClose);
    this.node.addEventListener('modechange', this.onModeChange);
  }

  componentWillUnmount() {
    this.node.removeEventListener('postopen', this.onOpen);
    this.node.removeEventListener('postclose', this.onClose);
    this.node.removeEventListener('preopen', this.onPreOpen);
    this.node.removeEventListener('preclose', this.onPreClose);
    this.node.removeEventListener('modechange', this.onModeChange);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isOpen) {
      this.node.open();
    } else {
      this.node.close();
    }
  }
}

SplitterSide.propTypes = {
  /**
   * @name collapse
   * @type bool
   * @description
   *  [en] Specify the collapse behavior. Valid values are `"portrait"`, `"landscape"` or a media query.
   *     The strings `"portrait"` and `"landscape"` means the view will collapse when device is in landscape or portrait orientation.
   *     If the value is not defined, the view always be in `"collapse"` mode.
[/en]
   *  [ja][/ja]
   */
  collapse: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  /**
   * @name isSwipeable
   * @type bool
   * @description
   *  [en]Ennable swipe interaction on collapse mode.[/en]
   *  [ja][/ja]
   */
  isSwipeable: PropTypes.bool,

  /**
   * @name isOpen
   * @type bool
   * @description
   *  [en]Specifies whether the menu is open.[/en]
   *  [ja][/ja]
   */
  isOpen: PropTypes.bool,

  /**
   * @name onOpen
   * @type function
   * @description
   *  [en]Called after the menu is opened.[/en]
   *  [ja][/ja]
   */
  onOpen: PropTypes.func,

  /**
   * @name onClose
   * @type function
   * @description
   *  [en]Called after the menu is closed.[/en]
   *  [ja][/ja]
   */
  onClose: PropTypes.func,

  /**
   * @name side
   * @type string
   * @description
   *  [en]Specify which side of the screen the SplitterSide element is located. Possible values are `"left"` and `"right"`.[/en]
   *  [ja][/ja]
   */
  side: PropTypes.oneOf(['left', 'right']),

  /**
   * @name swipeTargetWidth
   * @type number
   * @description
   *  [en]Specifies the width of the menu with a number (for pixels) or a string (e.g. "20%" for percentage).[/en]
   *  [ja][/ja]
   */
  swipeTargetWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * @name width
   * @type  number
   * @description
   *  [en]Specifies the width of the menu with a number (for pixels) or a string (e.g. "20%" for percentage).[/en]
   *  [ja][/ja]
   */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * @name animation
   * @type string
   * @required false
   * @description
   *  [en]Specify the animation. Use one of `overlay`, `push`, `reveal`, or `default`.[/en]
   *  [ja][/ja]
   */
  animation: PropTypes.string,

  /**
   * @name animationOptions
   * @type object
   * @required false
   * @description
   *  [en]Specify the animation's duration, delay and timing. E.g.  `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *  [ja][/ja]
   */
  animationOptions: PropTypes.object,

  /**
   * @name openThreshold
   * @type object
   * @required false
   * @description
   *  [en] Specify how much the menu needs to be swiped before opening. A value between `0` and `1`.  [/en]
   *  [ja][/ja]
   */
  openThreshold: PropTypes.number,

  /**
   * @name mode
   * @type string
   * @required false
   * @description
   *  [en] Current mode. Possible values are `"collapse"` or `"split"`. This attribute is read only.  [/en]
   *  [ja][/ja]
   */
  mode: PropTypes.oneOf(['collapse', 'split']),

  /**
   * @name onPreOpen
   * @type string
   * @description
   *  [en] Called before the menu opens.  [/en]
   *  [ja][/ja]
   */
  onPreOpen: PropTypes.func,

  /**
   * @name onPreClose
   * @type string
   * @description
   *  [en] Called before the menu closes.  [/en]
   *  [ja][/ja]
   */
  onPreClose: PropTypes.func,

  /**
   * @name onModeChange
   * @type string
   * @description
   *  [en] Called after the component's mode changes. [/en]
   *  [ja][/ja]
   */
  onModeChange: PropTypes.func
};

export default SplitterSide;
