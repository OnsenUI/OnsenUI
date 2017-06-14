import React from 'react';
import PropTypes from 'prop-types';
import BaseInput from './BaseInput.jsx';
import Util from './Util.js';

/**
 * @original ons-input
 * @category form
 * @tutorial react/Reference/input
 * @description
 * [en]
 * An input element. The `type` attribute can be used to change the input type. All text input types as well as `checkbox` and `radio` are supported. The component will automatically render as a Material Design input on Android devices. Most attributes that can be used for a normal `<input>` element can also be used on the `<ons-input>` element..
 [/en]
 * [ja][/ja]
 * @example
 * <Input
 *   value={this.state.text} float
 *   onChange={(event) => { this.setState({text: event.target.value})} }
 *   modifier='material'
 *   placeholder='Username' />
 */
class Input extends BaseInput {

  render() {
    var {...other} = this.props;
    other['input-id'] = this.props.inputId;

    Util.convert(other, 'disabled');

    return (
      <ons-input {...other} />
    );
  }
}

Input.propTypes = {
    /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the input.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name disabled
   * @type bool
   * @description
   *  [en]Specifies whether the input is disabled.[/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool,

  /**
   * @name onChange
   * @type function
   * @description
   *  [en]Called when the text of the input changes.[/en]
   *  [ja][/ja]
   */
  onChange: PropTypes.func,

  /**
   * @name value
   * @type string
   * @description
   *  [en]Content of the input.[/en]
   *  [ja][/ja]
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]),

  /**
   * @name placehoder
   * @type string
   * @description
   *  [en] Placeholder text. In Material Design this placeholder will be a floating label. [/en]
   *  [ja][/ja]
   */
  placeholder: PropTypes.string,

  /**
   * @name type
   * @type string
   * @description
   *  [en]
   *    Specify the input type. This is the same as the "type" attribute for normal inputs. It expects strict text types such as `text`, `password`, etc. For checkbox, radio button, select or range, please have a look at the corresponding components.
   *
   *    Please take a look at [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-type) for an exhaustive list of possible values. Depending on the platform and browser version some of these might not work.
   *  [/en]
   *  [ja][/ja]
   */
  type: PropTypes.string,

  /**
   * @name inputId
   * @type string
   * @description
   *  [en]  Specify the "id" attribute of the inner `<input>` element. This is useful when using <label for="..."> elements [/en]
   *  [ja][/ja]
   */
  inputId: PropTypes.string,

  /**
   * @name float
   * @type bool
   * @description
   *  [en]  If this attribute is present, the placeholder will be animated in Material Design.  [/en]
   *  [ja][/ja]
   */
  float: PropTypes.bool
};

export default Input;
