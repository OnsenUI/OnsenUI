import PropTypes from 'prop-types';
import 'onsenui/esm/elements/ons-toast';

import onsCustomElement from '../onsCustomElement';
import baseDialog from '../baseDialog';

const propTypes = {
  /**
   * @name visible
   * @type bool
   * @description
   *  [en]
   *  Indicates whether the toast open and shown.
   *  [/en]
   *  [ja][/ja]
   */
  visible: PropTypes.bool,

  /**
   * @name isOpen
   * @type bool
   * @description
   *  [en]
   *  DEPRECATED! Use `visible` instead.
   *  [/en]
   *  [ja][/ja]
   */
  isOpen: PropTypes.bool,

  /**
   * @name animation
   * @type string
   * @required false
   * @description
   *  [en]Animation name. Available animations are `"default"`, `"ascend"` (Android), `"lift"` (iOS), `"fall"`, `"fade"` or `"none"`.[/en]
   *  [ja][/ja]
   */
  animation: PropTypes.string,

  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the toast.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

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
   * @name onPreShow
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called just before the toast is displayed.
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
   *  Called just after the toast is displayed.
   *  [/en]
   *  [ja][/ja]
   */
  onPostShow: PropTypes.func,

  /**
   * @name onPreHide
   * @type function
   * @required false
   * @description
   *  [en]Called just before the toast is hidden.[/en]
   *  [ja][/ja]
   */
  onPreHide: PropTypes.func,

  /**
   * @name onPostHide
   * @type function
   * @required false
   * @description
   *  [en]Called just after the toast is hidden.[/en]
   *  [ja][/ja]
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
   *  [ja][/ja]
   */
  onDeviceBackButton: PropTypes.func
};

const deprecated = {
  isOpen: 'visible'
};

const notAttributes = ['onDeviceBackButton'];

/**
 * @original ons-toast
 * @category dialog
 * @tutorial react/Reference/toast
 * @description
 * [en]
 *  The Toast or Snackbar component is useful for displaying dismissable information or simple actions at (normally) the bottom of the page.
 *
 *  This component does not block user input, allowing the app to continue its flow. Furthermore, it can be automatically hidden after a timeout.
 * [/en]
 * [ja][/ja]
 */
const Toast = onsCustomElement(baseDialog('ons-toast'), {propTypes, deprecated, notAttributes});
Toast.propTypes = propTypes;

export default Toast;
