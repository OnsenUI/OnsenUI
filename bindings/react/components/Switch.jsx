import React from 'react';
import ReactDOM from 'react-dom';

var Switch = React.createClass({
  componentDidMount: function() {
    var node = ReactDOM.findDOMNode(this);
    node.addEventListener('change', this.props.onChange);
  },

  componentWillUnmount: function() {
    var node = ReactDOM.findDOMNode(this);
    node.removeEventListener('change', this.props.onChange);
  },

  render: function() {
    var {checked, ...other} = this.props;

    return (
      <ons-switch checked={checked ? '' : null} {...other} />
    );
  }
});

export default Switch;
