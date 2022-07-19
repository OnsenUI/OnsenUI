import PropTypes from 'prop-types';
import 'onsenui/esm/elements/ons-search-input';

import onsCustomElement from '../onsCustomElement';
import oneTimeProp from '../oneTimeProp';
import INPUT_PROPS from '../inputProps';

const nameMap = {
  ...INPUT_PROPS
};

const withDefaultValue = component => oneTimeProp(component, 'defaultValue', 'value');

const notAttributes = [
  'value' // value must be applied as property since attribute only works before input is touched
];


/**
 * @original ons-search-input
 * @category form
 * @tutorial react/Reference/search-input
 * @description
 * [en]
 *  A search input component. The component will automatically render as a Material Design search input on Android devices.
 *
 *  Most attributes that can be used for a normal `<input>` element can also be used on the `<SearchInput>` component.
 * [/en]
 * [ja][/ja]
 * @example
 * <SearchInput
 *   value={this.state.text}
 *   onChange={(event) => { this.setState({text: event.target.value})} }
 *   modifier='material'
 *   placeholder='Username' />
 */
const SearchInput = withDefaultValue(onsCustomElement('ons-search-input', {deprecated: nameMap, notAttributes}));

SearchInput.propTypes = {
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
   * @name readOnly
   * @type bool
   * @description
   *  [en]Specifies whether the input is read-only.[/en]
   *  [ja][/ja]
   */
  readOnly: PropTypes.bool,

  /**
   * @name onChange
   * @type function
   * @description
   *  [en]Called when the inner input fires a `change` event.[/en]
   *  [ja][/ja]
   */
  onChange: PropTypes.func,

  /**
   * @name onInput
   * @type function
   * @description
   *  [en]Called when the inner input fires an `input` event.[/en]
   *  [ja][/ja]
   */
  onInput: PropTypes.func,

  /**
   * @name value
   * @type string
   * @description
   *  [en]Content of the input (controlled).[/en]
   *  [ja][/ja]
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]),

  /**
   * @name defaultValue
   * @type string
   * @description
   *  [en]Content of the input at first render (uncontrolled).[/en]
   *  [ja][/ja]
   */
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]),

  /**
   * @name placeholder
   * @type string
   * @description
   *  [en] Placeholder text. In Material Design this placeholder will be a floating label. [/en]
   *  [ja][/ja]
   */
  placeholder: PropTypes.string,

  /**
   * @name inputId
   * @type string
   * @description
   *  [en]  Specify the "id" attribute of the inner `<input>` element. This is useful when using <label for="..."> elements [/en]
   *  [ja][/ja]
   */
  inputId: PropTypes.string
};

export default SearchInput;
