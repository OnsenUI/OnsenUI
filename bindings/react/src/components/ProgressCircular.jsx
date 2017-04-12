import SimpleWrapper from './SimpleWrapper.jsx';
import React from 'react';
import Util from './Util.js';

/**
 * @original ons-progress-circular
 * @category visual
 * @tutorial react/Reference/progress
 * @description
 * [en] This component displays a circular progress indicator. It can either be used to show how much of a task has been completed or to show a looping animation to indicate that an operation is currently running.
 * [/en]
 * [jp][/jp]
 * @example
 *<ProgressCircular value={55} secondaryValue={87} />
 *<ProgressCircular indeterminate />
 */
class ProgressCircular extends SimpleWrapper {
  _getDomNodeName() {
    return 'ons-progress-circular';
  }

  render() {
    var {...others} = this.props;

    Util.convert(others, 'indeterminate');
    Util.convert(others, 'secondaryValue', {newName: 'secondary-value'});

    return React.createElement(this._getDomNodeName(), others, this.props.children);
  }

}

ProgressCircular.propTypes = {
  /**
   * @name modifier
   * @type string
   * @required false
   * @description
   *  [en]The appearance of the progress indicator.[/en]
   *  [jp] [/jp]
   */
  modifier: React.PropTypes.string,

  /**
   * @name value
   * @type number
   * @description
   *  [en]
   *  Current progress. Should be a value between 0 and 100.
   *  [/en]
   *  [jp] [/jp]
   */
  value: React.PropTypes.number,

  /**
   * @name secondaryValue
   * @type bool
   * @description
   *  [en]
   *  Current secondary progress. Should be a value between 0 and 100.
   *  [/en]
   *  [jp] [/jp]
   */
  secondaryValue: React.PropTypes.number,

  /**
   * @name indeterminate
   * @type bool
   * @description
   *  [en] If this property is set, an infinite looping animation will be shown. [/en]
   *  [jp] [/jp]
   */
  indeterminate: React.PropTypes.bool
};

export default ProgressCircular;
