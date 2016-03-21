var OnsPullHook  = React.createClass({
  componentDidMount: function() {
    window.addEventListener('changestate', this.props.onChange);
    this.refs.pullHook.setActionCallback(this.props.onLoad);
  },
  componentWillUnmount: function() {
    this.refs.pullHook.removeEventListener('changestate', this.pullHookChanged);
  },
  render: function() {
    return <ons-pull-hook ref="pullHook" {...this.props} />;
  }
});
