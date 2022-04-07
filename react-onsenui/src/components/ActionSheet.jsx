import PropTypes from 'prop-types';
import 'onsenui/esm/elements/ons-action-sheet';

import onsCustomElement from '../onsCustomElement';
import baseDialog from '../baseDialog';

const propTypes = {
  /**
   * @name title
   * @type string
   * @required false
   * @description
   *  [en]
   *  Optional title of the action sheet. A new element will be created containing this string.
   *  [/en]
   *  [ja][/ja]
   */
  title: PropTypes.string,

  /**
   * @name onDialogCancel
   * @type function
   * @required false
   * @description
   *  [en]
   *  Called only if cancelable is true. It will be called after tapping the background or by pressing the back button on Android devices.
   *  [/en]
   *  [ja][/ja]
   */
  onDialogCancel: PropTypes.func,

  /**
   * @name visible
   * @type bool
   * @description
   *  [en]
   *  Indicates whether the dialog is open and shown.
   *  [/en]
   *  [ja][/ja]
   */
  visible: PropTypes.bool,

  /**
   * @name cancelable
   * @type bool
   * @required false
   * @description
   *  [en]
   *  Specifies whether the dialog is cancelable or not.
   *  A cancelable dialog will call onCancel  when tapping the background or or  pressing the back button on Android devices
   *  [/en]
   *  [ja][/ja]
   */
  cancelable: PropTypes.bool,

  /**
   * @name disabled
   * @type bool
   * @required false
   * @description
   *  [en]
   *  Specifies whether the dialog is disabled.
   *  [/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool,

  /**
   * @name onCancel
   * @type function
   * @required false
   * @description
   *  [en]
   *  DEPRECATED! Use `onDialogCancel` instead.
   *  [/en]
   *  [ja][/ja]
   */
  onCancel: PropTypes.func,

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
   * @name isCancelable
   * @type bool
   * @required false
   * @description
   *  [en]
   *  DEPRECATED! Use `cancelable` instead.
   *  [/en]
   *  [ja][/ja]
   */
  isCancelable: PropTypes.bool,

  /**
   * @name isDisabled
   * @type bool
   * @required false
   * @description
   *  [en]
   *  DEPRECATED! Use `disabled` instead.
   *  [/en]
   *  [ja][/ja]
   */
  isDisabled: PropTypes.bool,

  /**
   * @name animation
   * @type string
   * @required false
   * @description
   *  [en]
   *  The animation used when showing and hiding the dialog. Can be either `"none"` or `"default"`.
   *  [/en]
   *  [ja][/ja]
   */
  animation: PropTypes.string,

  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the dialog.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name maskColor
   * @type string
   * @required false
   * @description
   *  [en]Color of the background mask. Default is "rgba(0, 0, 0, 0.2)"[/en]
   *  [ja][/ja]
   */
  maskColor: PropTypes.string,

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
   *  Called just before the action sheet is displayed.
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
   *  Called just after the action sheet is displayed.
   *  [/en]
   *  [ja][/ja]
   */
  onPostShow: PropTypes.func,

  /**
   * @name onPreHide
   * @type function
   * @required false
   * @description
   *  [en]Called just before the action sheet is hidden.[/en]
   *  [ja][/ja]
   */
  onPreHide: PropTypes.func,

  /**
   * @name onPostHide
   * @type function
   * @required false
   * @description
   *  [en]Called just after the action sheet is hidden.[/en]
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
  onCancel: 'onDialogCancel',
  isOpen: 'visible',
  isDisabled: 'disabled',
  isCancelable: 'cancelable'
};

const notAttributes = ['onDeviceBackButton'];

/**
 * @original ons-action-sheet
 * @category dialog
 * @tutorial react/Reference/action-sheet
 * @description
 * [en]
 *  Action/bottom sheet that is displayed on top of current screen.
 *  The action sheet is useful for displaying a list of options and asking the user to make a decision. An ActionSheetButton component is provided for this purpose, although it can contain any type of content.
 *  It will automatically be displayed as Material Design (bottom sheet) when running on an Android device.
 * [/en]
 * [ja][/ja]
 */
const ActionSheet = onsCustomElement(baseDialog('ons-action-sheet'), {propTypes, deprecated, notAttributes});
ActionSheet.propTypes = propTypes;

export default ActionSheet;
