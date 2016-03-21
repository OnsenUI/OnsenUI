var OnsInput = React.createClass({
  render: function() {
    return (
      <ons-input value={this.props.value}  _compiled="">
        <input className="text-input"  {...this.props} />
        <span className="text-input__label" style={{color: 'rgba(0, 0, 0, 0.498039)'}}> </span>
      </ons-input>
    );
  }
});
