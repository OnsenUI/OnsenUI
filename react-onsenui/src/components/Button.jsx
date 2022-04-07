import PropTypes from 'prop-types';
import 'onsenui/esm/elements/ons-button';

import onsCustomElement from '../onsCustomElement';

const propTypes = {
  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the button.[/en]
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
   * @name ripple
   * @type bool
   * @description
   *  [en]
   *  Specifies whether the button has a ripple effect.
   *  [/en]
   *  [ja][/ja]
   */
  ripple: PropTypes.bool,

  /**
   * @name onClick
   * @type function
   * @description
   *  [en] This function will be called when the button is clicked. [/en]
   *  [ja][/ja]
   */
  onClick: PropTypes.func
};

/**
 * @original ons-button
 * @category form
 * @tutorial react/Reference/button
 * @description
 * [en] Button component. If you want to place a button in a toolbar, use `ToolbarButton` or `BackButton` instead. Will automatically display as a Material Design button with a ripple effect on Android.
 [/en]
 * [ja][/ja]
 * @example
 * <Button modifier="large--cta">
 *   Tap Me
 * </Button>
 */
const Button = onsCustomElement('ons-button', {propTypes});
Button.propTypes = propTypes;

export default Button;
