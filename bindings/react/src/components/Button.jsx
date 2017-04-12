import SimpleWrapper from './SimpleWrapper.jsx';
import React from 'react';

/**
 * @original ons-button
 * @category form
 * @tutorial react/Reference/button
 * @description
 * [en] Button component. If you want to place a button in a toolbar, use `ToolbarButton` or `BackButton` instead. Will automatically display as a Material Design button with a ripple effect on Android.
 [/en]
 * [jp][/jp]
 * @example
 * <Button modifier="large--cta">
 *   Tap Me
 * </Button>
 */
class Button extends SimpleWrapper {
  _getDomNodeName() {
    return 'ons-button';
  }
}

Button.propTypes = {
  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the button.[/en]
   *  [jp] [/jp]
   */
  modifier: React.PropTypes.string,

  /**
   * @name disabled
   * @type bool
   * @description
   *  [en]
   *  Specifies whether the button is disabled.
   *  [/en]
   *  [jp] [/jp]
   */
  disabled: React.PropTypes.bool,

  /**
   * @name ripple
   * @type bool
   * @description
   *  [en]
   *  Specifies whether the button has a ripple effect.
   *  [/en]
   *  [jp] [/jp]
   */
  ripple: React.PropTypes.bool,

  /**
   * @name onClick
   * @type function
   * @description
   *  [en] This function will be called ones the button is clicked. [/en]
   *  [jp] [/jp]
   */
  onClick: React.PropTypes.func
};

export default Button;
