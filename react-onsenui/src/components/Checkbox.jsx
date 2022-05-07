import PropTypes from 'prop-types';
import 'onsenui/esm/elements/ons-checkbox';

import onsCustomElement from '../onsCustomElement';
import oneTimeProp from '../oneTimeProp';
import INPUT_PROPS from '../inputProps';

const nameMap = {
  ...INPUT_PROPS
};

const withDefaultChecked = component => oneTimeProp(component, 'defaultChecked', 'checked');

/**
 * @original ons-checkbox
 * @category form
 * @tutorial react/Reference/checkbox
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
const Checkbox = withDefaultChecked(onsCustomElement('ons-checkbox', {deprecated: nameMap}));

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
   *  [en]Called when the inner checkbox fires a `change` event.[/en]
   *  [ja][/ja]
   */
  onChange: PropTypes.func,

  /**
   * @name onInput
   * @type function
   * @description
   *  [en]Called when the inner checkbox fires an `input` event.[/en]
   *  [ja][/ja]
   */
  onInput: PropTypes.func,

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
   *  [en]Controls the state of the checkbox (controlled).[/en]
   *  [ja][/ja]
   */
  checked: PropTypes.bool,

  /**
   * @name defaultChecked
   * @type boolean
   * @description
   *  [en]Defined the state of the checkbox at first render for uncontrolled inputs.[/en]
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

export default Checkbox;
