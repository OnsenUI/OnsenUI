import React from 'react';
import PropTypes from 'prop-types';
import BaseInput from './BaseInput.jsx';
import Util from './Util.js';

/**
 * @original ons-checkbox
 * @category form
 * @tutorial react/Reference/input
 * @description
 * [en]
 *  A checkbox element. The component will automatically render as a Material Design checkbox on Android devices.
 *
 *  Most attributes that can be used for a normal `<input type="checkbox">` element can also be used on the `<Checkbox>` component.
 * [/en]
 * [ja][/ja]
 * @example
 * <Checkbox
 *   onChange={event => { this.setState({checked: event.target.checked})} }
 *   modifier='material' />
 */
class Checkbox extends BaseInput {

  get EVENT_TYPES() {
    return ['change'];
  }

  render() {
    var {checked, ...other} = this.props;
    other['input-id'] = this.props.inputId;

    Util.convert(other, 'disabled');

    return (
      <ons-checkbox checked={checked ? '' : null} {...other} />
    );
  }
}

Checkbox.propTypes = {
    /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the checkbox.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name disabled
   * @type bool
   * @description
   *  [en]
   *  Specifies whether the checkbox is disabled.
   *  [/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool,

  /**
   * @name onChange
   * @type function
   * @description
   *  [en] Called when the checkbox state changes.[/en]
   *  [ja][/ja]
   */
  onChange: PropTypes.func,

  /**
   * @name value
   * @type string
   * @description
   *  [en] Value of the checkbox.[/en]
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
   *  [en]Controls the state of the checkbox.[/en]
   *  [ja][/ja]
   */
  checked: PropTypes.bool,

  /**
   * @name inputId
   * @type string
   * @description
   *  [en]Specify the "id" attribute of the inner `<input>` element. This is useful when using <label for="..."> elements.[/en]
   *  [ja][/ja]
   */
  inputId: PropTypes.string
};

export default Checkbox;
