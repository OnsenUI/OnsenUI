import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import BasicComponent from './BasicComponent.jsx';

/**
 * @original ons-modal
 * @category dialog
 * @tutorial react/Reference/modal
 * @description
 * [en]
 *   A modal component covers the entire screen. Underlying components are not
 *   subject to any events while the modal component is shown.
 *
 *   This component can be used to block user input while some operation is
 *   running or to show some information to the user.
 * [/en]
 * [ja]
 *   画面全体をマスクするモーダル用コンポーネントです。下側にあるコンポーネントは、
 *   モーダルが表示されている間はイベント通知が行われません
 * [/ja]
 * @example
  <Page
    renderModal={() => (
      <Modal isOpen={this.state.isLoading}>
        Loading ...
      </Modal>
    )}>
    <div> Page content </div>
  </Page>
 */
class Modal extends BasicComponent {
  constructor(...args) {
    super(...args);
    this.node = null;
  }

  componentDidMount() {
    super.componentDidMount();
    this.node = ReactDOM.findDOMNode(this);

    if (this.props.onDeviceBackButton instanceof Function) {
      this.node.onDeviceBackButton = this.props.onDeviceBackButton;
    }

    this._update(this.props, false);
  }

  componentWillReceiveProps(nextProps) {
    this._update(nextProps, this.props.isOpen);
  }

  _update(props, isOpen) {
    const animationOptions = {
      animation: props.animation,
      animationOptions: props.animationOptions
    };

    if (props.isOpen && !isOpen) {
      this.node.show(animationOptions).then(() => props.onShow && props.onShow());
    } else if (!props.isOpen && isOpen) {
      this.node.hide(animationOptions).then(() => props.onHide && props.onHide());
    }
  }

  componentWillUnmount() {
    this.node = null;
  }

  render() {
    const {...others} = this.props;
    return (
      <ons-modal
        {...others}
      >
        {this.props.children}
      </ons-modal>
    );
  }
}

Modal.propTypes = {
  /**
   * @name animation
   * @type {String}
   * @description
   *   [en]
   *     Animation name. Available animations are `"fade"` and `"none"`.
   *   [/en]
   */
  animation: PropTypes.oneOf(['none', 'fade']),

  /**
   * @name animationOptions
   * @type object
   * @description
   *  [en]Specify the animation's duration, delay and timing. E.g.  `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   */
  animationOptions: PropTypes.object,

  /**
   * @name onShow
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called Fired right after the modal is shown.
   *  [/en]
   */
  onShow: PropTypes.func,

  /**
   * @name onHide
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called after the modal is hidden.
   *  [/en]
   */
  onHide: PropTypes.func,

  /**
   * @name isOpen
   * @type boolean
   * @description
   *  [en]When `true` the modal will show itself.[/en]
   */
  isOpen: PropTypes.bool,

  /**
   * @name onDeviceBackButton
   * @type function
   * @required false
   * @description
   *  [en]
   *  Custom handler for device back button.
   *  [/en]
   *  [ja][/ja]
   */
  onDeviceBackButton: PropTypes.func
};

Modal.defaultProps = {
  isOpen: false,
  animation: 'none'
};

export default Modal;
