var MyPage  = React.createClass({
  getInitialState: function() {
    return {
      name: 'placeholder',
    };
  },
  onChange: function(event) {
    this.setState({name: event.target.value});
  },
  render: function() {
    return (      <div style={{textAlign: 'center'}}>
      <h1>Page Content</h1>
        <OnsInput type="text" value={this.state.name} onChange={this.onChange} />
        <div style={{marginTop: 10}}> The input is {this.state.name} </div>
      </div>
    );
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
