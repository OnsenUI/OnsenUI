var MyPage  = React.createClass({
  getInitialState: function() {
    return {
      name: 'Andreas',
    };
  },
  onChange: function(event) {
    this.setState({name: event.target.value});
  },

  render: function() {
    return (
      <div style={{textAlign: 'center'}}>
        <br />
        <Ons.Input placeholder="Name" float value={this.state.name} onChange={this.onChange} />
        <p>Hello there, {this.state.name}!</p>
      </div>
    );
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
