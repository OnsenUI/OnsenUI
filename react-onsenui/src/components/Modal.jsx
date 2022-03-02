import BaseDialog from './BaseDialog.jsx';
import PropTypes from 'prop-types';
import 'onsenui/esm/elements/ons-modal';

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
  <Page>
    <div> Page content </div>

    <Modal isOpen={this.state.isLoading}>
      Loading ...
    </Modal>
  </Page>
 */
class Modal extends BaseDialog {
  _getDomNodeName() {
    return 'ons-modal';
  }
}

Modal.propTypes = {
  /**
   * @name animation
   * @type {String}
   * @description
   *   [en]
   *     Animation name. Available animations are `"fade"`, `"lift"` and `"none"`.
   *   [/en]
   */
  animation: PropTypes.oneOf(['none', 'fade', 'lift']),

  /**
   * @name animationOptions
   * @type object
   * @description
   *  [en]Specify the animation's duration, delay and timing. E.g.  `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   */
  animationOptions: PropTypes.object,

  /**
   * @name onPreShow
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called just before the modal is displayed.
   *  [/en]
   *  [ja][/ja]
   */
  onPreShow: PropTypes.func,

  /**
   * @name onPostShow
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called just after the modal is displayed.
   *  [/en]
   *  [ja][/ja]
   */
  onPostShow: PropTypes.func,

  /**
   * @name onPreHide
   * @type function
   * @required false
   * @description
   *  [en]Called just before the modal is hidden.[/en]
   *  [ja][/ja]
   */
  onPreHide: PropTypes.func,

  /**
   * @name onPostHide
   * @type function
   * @required false
   * @description
   *  [en]Called just after the modal is hidden.[/en]
   *  [ja][/ja]
   */
  onPostHide: PropTypes.func,

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
