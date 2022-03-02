import PropTypes from 'prop-types';
import BaseInput from './BaseInput.jsx';
import 'onsenui/esm/elements/ons-switch';

/**
 * @original ons-switch
 * @category form
 * @tutorial react/Reference/switch
 * @description
 * [en]   Switch component. The switch can be toggled both by dragging and tapping.
 *     Will automatically displays a Material Design switch on Android devices.
 [/en]
 * [ja][/ja]
 * @example
 * <Switch checked={this.state.checked} onChange={this.onChange} />
 */
class Switch extends BaseInput {
  _getDomNodeName() {
    return 'ons-switch';
  }

  get EVENT_TYPES() {
    return ['change'];
  }
}

Switch.propTypes = {
  /**
   * @name onChange
   * @type function
   * @description
   *  [en] Called when the value of the switch changes (checked/unchecked) [/en]
   *  [ja][/ja]
   */
  onChange: PropTypes.func,

  /**
   * @name checked
   * @type bool
   * @description
   *  [en] Whether the switch is checked.[/en]
   *  [ja][/ja]
   */
  checked: PropTypes.bool,

  /**
   * @name disabled
   * @type bool
   * @description
   *  [en] If set, the switch is disabled.[/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool,

  /**
   * @name inputId
   * @type string
   * @description
   *  [en] Specify the `id` attribute of the inner `<input>` element. This is useful when using `<label for="...">` elements.[/en]
   *  [ja][/ja]
   */
  inputId: PropTypes.string
};

export default Switch;
