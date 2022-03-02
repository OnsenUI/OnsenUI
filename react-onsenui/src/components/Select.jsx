import React from 'react';
import PropTypes from 'prop-types';
import BaseInput from './BaseInput.jsx';
import Util from './Util.js';
import 'onsenui/esm/elements/ons-select';

/**
 * @original ons-select
 * @category form
 * @tutorial react/Reference/select
 * @description
 * [en]
 *   Select input component.
 * [/en]
 * [ja][/ja]
 * @example
 * <Select modifier="material"
 *   value={this.state.value}
 *   onChange={(event) => this.setState({value: event.target.value})}>
 *   <option value="1">1</option>
 *   <option value="2">2nd</option>
 *   <option value="3">3rd option</option>
 * </Select>
 */
class Select extends BaseInput {
  get EVENT_TYPES() {
    return ['change'];
  }

  render() {
    const { value, onChange, ...props } = this.props;
    const attrs = Util.getAttrs(this, props);

    return (
      <ons-select { ...attrs }>
        <select>
          {this.props.children}
        </select>
      </ons-select>
    );
  }
}

Select.propTypes = {
  /**
   * @name modifier
   * @type string
   * @description
   *  [en]The appearance of the select box.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name disabled
   * @type bool
   * @description
   *  [en]Specifies whether the select is disabled.[/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool,

  /**
   * @name onChange
   * @type function
   * @description
   *  [en]Called when the value of the select changes.[/en]
   *  [ja][/ja]
   */
  onChange: PropTypes.func,

  /**
   * @name value
   * @type string
   * @description
   *  [en]Use this prop to set the selected option value.[/en]
   *  [ja][/ja]
   */
  value: PropTypes.string,

  /**
   * @name multiple
   * @type boolean
   * @description
   *  [en]If this attribute is defined, multiple options can be selected at once.[/en]
   *  [ja][/ja]
   */
  multiple: PropTypes.bool,

  /**
   * @name autofocus
   * @type boolean
   * @description
   *  [en]Element automatically gains focus on page load.[/en]
   *  [ja][/ja]
   */
  autofocus: PropTypes.bool,

  /**
   * @name required
   * @type boolean
   * @description
   *  [en]Make the select input required for submitting the form it is part of.[/en]
   *  [ja][/ja]
   */
  required: PropTypes.bool,

  /**
   * @name form
   * @type string
   * @description
   *  [en]Associate a select element to an existing form on the page, even if not nested.[/en]
   *  [ja][/ja]
   */
  form: PropTypes.string,

  /**
   * @name size
   * @type string
   * @description
   *  [en]How many options are displayed; if there are more than the size then a scroll appears to navigate them[/en]
   *  [ja][/ja]
   */
  size: PropTypes.string
};

export default Select;
