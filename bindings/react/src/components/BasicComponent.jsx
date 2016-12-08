import React from 'react';
import ReactDOM from 'react-dom';

import ons from 'onsenui';

class BasicComponent extends React.Component {
  constructor(...args) {
    super(...args);
    this.updateClasses = this.updateClasses.bind(this);
  }

  updateClasses() {
    var node = ReactDOM.findDOMNode(this);

    if (typeof this.props.className !== 'undefined') {
      if (this.lastClass) {
        node.className = node.className.replace(this.lastClass, ' ');
      }

      this.lastClass = ' ' + this.props.className.trim();

      node.className = node.className.trim() + this.lastClass;
    }

    if (!ons) {
      throw new Error("react-onsenui requires `onsenui`, make sure you are loading it with `import onsenui` or `require('onsenui')` before using the components");
    }

    ons._autoStyle.prepare(node);
  }

  componentDidMount() {
    this.updateClasses();
  }

  componentDidUpdate() {
    this.updateClasses();
  }
}

export default BasicComponent;
