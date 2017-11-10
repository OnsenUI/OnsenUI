import React from 'react';
import BasicComponent from './BasicComponent.jsx';
import Util from './Util.js';

class SimpleWrapper extends BasicComponent {
  render() {
    return React.createElement(this._getDomNodeName(), Util.getAttrs(this), this.props.children);
  }
}

export default SimpleWrapper;
