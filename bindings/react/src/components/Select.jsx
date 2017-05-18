import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import BasicComponent from './BasicComponent.jsx';
import Util from './Util.js';

const EVENT_TYPES = ['change', 'input'];

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
 *   onChange={(event) => this.setState({value: event.target.value})}
 *   <option value="1">1</option>
 *   <option value="2">2nd</option>
 *   <option value="3">3rd option</option>
 * </Select>
 */
class Select extends BasicComponent {

  constructor(...args) {
    super(...args);

    this.onChange = event => {
      if (this.props.onChange) {
        return this.props.onChange(event);
      }
    };
  }

  componentDidMount() {
    super.componentDidMount();
    var node = ReactDOM.findDOMNode(this);

    EVENT_TYPES.forEach((eventType) => {
      node.addEventListener(eventType, this.onChange);
    });
  }

  componentWillUnmount() {
    var node = ReactDOM.findDOMNode(this);

    EVENT_TYPES.forEach((eventType) => {
      node.removeEventListener(eventType, this.onChange);
    });
  }

  componentWillReceiveProps(props) {
    var node = ReactDOM.findDOMNode(this);

    if (typeof props.value !== 'undefined' && node.value !== props.value) {
      node.value = props.value;
    }

    if (typeof props.checked !== 'undefined') {
      node.checked = props.checked;
    }
  }

  render() {
    var {checked, ...other} = this.props;

    Util.convert(other, 'disabled');

    return (
      <ons-select checked={checked ? '' : null} {...other} />
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
   *  [en]Current value of the element.[/en]
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
