import React from 'react';
import ReactDOM from 'react-dom';

var PullHook  = React.createClass({
  componentDidMount: function() {
    var node = ReactDOM.findDOMNode(this);
    node.addEventListener('changestate', this.props.onChange);
    this.refs.pullHook.setActionCallback(this.props.onLoad);
  },
  componentWillUnmount: function() {
    var node = ReactDOM.findDOMNode(this);
    node.removeEventListener('changestate', this.props.onChange);
  },
  render: function() {
    return <ons-pull-hook ref="pullHook" {...this.props} />;
  }
});

export default PullHook;
