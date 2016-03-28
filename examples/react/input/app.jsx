var MyPage  = React.createClass({
  getInitialState: function() {
    return {
      name: 'Andreas',
      checked: true,
    };
  },

  onInputChange: function(event) {
    this.setState({name: event.target.value});
  },

  onCheckboxChange: function(event) {
    this.setState({checked: event.target.checked});
  },

  render: function() {
    return (
      <div style={{textAlign: 'center'}}>
        <br />
        <Ons.Input placeholder="Name" float value={this.state.name} onChange={this.onInputChange} />
        <Ons.Input type="checkbox" checked={this.state.checked} onChange={this.onCheckboxChange} />
        <p>Hello there, {this.state.name}!</p>
        <p>Checkbox is {this.state.checked ? 'on' : 'off'}!</p>
      </div>
    );
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
