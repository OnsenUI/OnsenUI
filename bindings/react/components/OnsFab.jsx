var OnsFab = React.createClass({
  render: function() {
    return(
      <ons-fab {...this.props} class="fab" _compiled="">
        <span className="fab__icon">
          {this.props.children}
        </span>
      </ons-fab>);
    }
});
