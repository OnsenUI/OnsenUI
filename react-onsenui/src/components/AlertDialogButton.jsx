import SimpleWrapper from './SimpleWrapper.jsx';
import PropTypes from 'prop-types';
import 'onsenui/esm/elements/ons-alert-dialog-button';

/**
 * @original ons-alert-dialog-button
 * @category dialog
 * @tutorial react/Reference/dialog
 * @description
 * [en]Component that represent each button of the alert dialog.[/en]
 * [ja][/ja]
 */
class AlertDialogButton extends SimpleWrapper {
  _getDomNodeName() {
    return 'ons-alert-dialog-button';
  }
}

AlertDialogButton.propTypes = {
  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the alert dialog button.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name disabled
   * @type bool
   * @description
   *  [en]
   *  Specifies whether the button is disabled.
   *  [/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool,

  /**
   * @name onClick
   * @type function
   * @description
   *  [en]This function will be called when the button is clicked.[/en]
   *  [ja][/ja]
   */
  onClick: PropTypes.func
};

export default AlertDialogButton;
