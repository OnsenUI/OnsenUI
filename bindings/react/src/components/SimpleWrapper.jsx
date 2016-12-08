import React from 'react';
import BasicComponent from './BasicComponent.jsx';
import Util from './Util.js';

class SimpleWrapper extends BasicComponent {
  render() {
    var {...others} = this.props;

    Util.convert(others, 'disabled');
    Util.convert(others, 'ripple');

    return React.createElement(this._getDomNodeName(), others, this.props.children);
  }
}

export default SimpleWrapper;
