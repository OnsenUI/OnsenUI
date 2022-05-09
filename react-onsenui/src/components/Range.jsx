import PropTypes from 'prop-types';
import 'onsenui/esm/elements/ons-range';

import onsCustomElement from '../onsCustomElement';
import oneTimeProp from '../oneTimeProp';
import INPUT_PROPS from '../inputProps';

const nameMap = {
  ...INPUT_PROPS
};

const withDefaultValue = component => oneTimeProp(component, 'defaultValue', 'value');

/**
 * @original ons-range
 * @category form
 * @tutorial react/Reference/range
 * @description
 * [en]
 *   Range input component.
 * [/en]
 * [ja][/ja]
 * @example
 * <Range modifier="material"
 *   value={this.state.value}
 *   onChange={(event) => this.setState({value: parseInt(event.target.value)})}
 *   />
 */
const Range = withDefaultValue(onsCustomElement('ons-range', {deprecated: nameMap}));

Range.propTypes = {
  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the progress indicator.[/en]
   *  [ja][/ja]
   */
  modifier: PropTypes.string,

  /**
   * @name onChange
   * @type function
   * @description
   *  [en] Called when the value of the input changes.[/en]
   *  [ja][/ja]
   */
  onChange: PropTypes.func,

  /**
   * @name onInput
   * @type function
   * @description
   *  [en] Called when the inner range fires an `input` event.[/en]
   *  [ja][/ja]
   */
  onInput: PropTypes.func,

  /**
   * @name value
   * @type number
   * @description
   *  [en]
   *  Current value of the element.
   *  [/en]
   *  [ja][/ja]
   */
  value: PropTypes.number,

  /**
   * @name value
   * @type number
   * @description
   *  [en]
   *  Default value of the element (for uncontrolled components).
   *  [/en]
   *  [ja][/ja]
   */
  defaultValue: PropTypes.number,

  /**
   * @name disabled
   * @type bool
   * @description
   *  [en] If true, the element is disabled. [/en]
   *  [ja][/ja]
   */
  disabled: PropTypes.bool
};

export default Range;
