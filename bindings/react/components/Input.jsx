import React from 'react';
import ReactDOM from 'react-dom';

const EVENT_TYPES = ['change', 'input'];

var Input = React.createClass({
  componentDidMount: function() {
    var node = ReactDOM.findDOMNode(this);

    EVENT_TYPES.forEach((eventType) => {
      node.addEventListener(eventType, this.props.onChange);
    });
  },

  componentWillUnmount: function() {
    var node = ReactDOM.findDOMNode(this);

    EVENT_TYPES.forEach((eventType) => {
      node.removeEventListener(eventType, this.props.onChange);
    });
  },

  render: function() {
    return (
      <ons-input value={this.props.value} {...this.props}></ons-input>
    );
  }
});

export default Input;
