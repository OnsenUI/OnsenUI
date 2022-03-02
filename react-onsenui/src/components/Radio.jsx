import PropTypes from 'prop-types';
import BaseInput from './BaseInput.jsx';
import 'onsenui/esm/elements/ons-radio';

/**
 * @original ons-radio
 * @category form
 * @tutorial react/Reference/radio
 * @description
 * [en]
 *  A radio button element. The component will automatically render as a Material Design radio button on Android devices.
 *
 *  Most attributes that can be used for a normal `<input type="radio">` element can also be used on the `<Radio>` component.
 * [/en]
 * [ja][/ja]
 * @example
 * <Radio
 *   onChange={event => { this.setState({checked: event.target.checked})} }
 *   modifier='material' />
 */
class Radio extends BaseInput {
  _getDomNodeName() {
    return 'ons-radio';
  }

  get EVENT_TYPES() {
    return ['change'];
  }
}

Radio.propTypes = {
  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the radio button.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name disabled
   * @type bool
   * @description
   *  [en]
   *  Specifies whether the radio button is disabled.
   *  [/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool,

  /**
   * @name onChange
   * @type function
   * @description
   *  [en] Called when the radio button state changes.[/en]
   *  [ja][/ja]
   */
  onChange: PropTypes.func,

  /**
   * @name value
   * @type string
   * @description
   *  [en] Value of the radio button.[/en]
   *  [ja][/ja]
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]),

  /**
   * @name checked
   * @type boolean
   * @description
   *  [en]Controls the state of the radio button (controlled).[/en]
   *  [ja][/ja]
   */
  checked: PropTypes.bool,

  /**
   * @name defaultChecked
   * @type boolean
   * @description
   *  [en]Defined the state of the radio button at first render for uncontrolled inputs.[/en]
   *  [ja][/ja]
   */
  defaultChecked: PropTypes.bool,

  /**
   * @name inputId
   * @type string
   * @description
   *  [en]Specify the "id" attribute of the inner `<input>` element. This is useful when using <label for="..."> elements.[/en]
   *  [ja][/ja]
   */
  inputId: PropTypes.string
};

export default Radio;
