var MyPage  = React.createClass({
  getInitialState: function() {
    return {
      checked: true,
    };
  },
  onChange: function(event) {
    this.setState({checked: event.target.checked});
  },
  render: function() {
    return (      <div style={{textAlign: 'center'}}>
      <h1>Page Content</h1>
      <input type="checkbox" checked={this.state.checked} onChange={this.onChange} />
      <p />
      <Ons.Switch checked={this.state.checked} onChange={this.onChange} />
      <p />
      <div style={{marginTop: 10}}> The switch is {this.state.checked ? 'on' : 'off'} </div>
      </div>
    );
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
