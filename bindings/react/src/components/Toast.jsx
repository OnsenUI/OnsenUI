import BaseDialog from './BaseDialog.jsx';
import PropTypes from 'prop-types';

/**
 * @original ons-toast
 * @category dialog
 * @tutorial react/Reference/dialog
 * @description
 * [en]
 *  The Toast or Snackbar component is useful for displaying dismissable information or simple actions at (normally) the bottom of the page.
 *
 *  This component does not block user input, allowing the app to continue its flow. Furthermore, it can be automatically hidden after a timeout.
 * [/en]
 * [jp][/jp]
 */
class Toast extends BaseDialog {
  _getDomNodeName() {
    return 'ons-toast';
  }
}

Toast.propTypes = {
  /**
   * @name isOpen
   * @type bool
   * @required true
   * @description
   *  [en]
   *  Indicates whether the toast open and shown.
   *  [/en]
   *  [jp] [/jp]
   */
  isOpen: PropTypes.bool.isRequired,

  /**
   * @name animation
   * @type string
   * @required false
   * @description
   *  [en]Animation name. Available animations are `"default"`, `"ascend"` (Android), `"lift"` (iOS), `"fall"`, `"fade"` or `"none"`.[/en]
   *  [jp] [/jp]
   */
  animation: PropTypes.string,

  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the toast.[/en]
   *  [jp] [/jp]
   */
  modifier: PropTypes.string,

  /**
   * @name animationOptions
   * @type object
   * @required false
   * @description
   *  [en]Specify the animation's duration, delay and timing. E.g.  `{duration: 0.2, delay: 0.4, timing: 'ease-in'}`.[/en]
   *  [jp] [/jp]
   */
  animationOptions: PropTypes.object,

  /**
   * @name onPreShow
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called just before the toast is displayed.
   *  [/en]
   *  [jp][/jp]
   */
  onPreShow: PropTypes.func,

  /**
   * @name onPostShow
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called just after the toast is displayed.
   *  [/en]
   *  [jp][/jp]
   */
  onPostShow: PropTypes.func,

  /**
   * @name onPreHide
   * @type function
   * @required false
   * @description
   *  [en]Called just before the toast is hidden.[/en]
   *  [jp][/jp]
   */
  onPreHide: PropTypes.func,

  /**
   * @name onPostHide
   * @type function
   * @required false
   * @description
   *  [en]Called just after the toast is hidden.[/en]
   *  [jp][/jp]
   */
  onPostHide: PropTypes.func,

  /**
   * @name onDeviceBackButton
   * @type function
   * @required false
   * @description
   *  [en]
   *  Custom handler for device back button.
   *  [/en]
   *  [jp] どうしよう[/jp]
   */
  onDeviceBackButton: PropTypes.func
};

export default Toast;
