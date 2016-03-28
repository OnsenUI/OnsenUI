var MyPullHook = React.createClass({
  getInitialState: function() {
    return { pullHookState: 'initial' };
  },
  onLoad: function(done) {
    setTimeout(done, 1000);
  },
  onChange: function(event) {
    console.log('staet : ' + event.state);
    this.setState({pullHookState: event.state});
  },
  render: function() {
    var child;

    if (this.state.pullHookState == 'initial') {
      child = <span ><Ons.Icon size="35px" spin="false" icon="ion-arrow-down-a"></Ons.Icon> Pull down to refresh</span>;
    } else if (this.state.pullHookState == 'preaction') {
      child = <span><Ons.Icon  size="35px" spin="false" icon="ion-arrow-up-a"></Ons.Icon> Release to refresh</span>;
    } else {
      child = <span><Ons.Icon size="35px" spin="true" icon="ion-load-d"></Ons.Icon> Loading data...</span>;
    }

    return (
      <Ons.PullHook onChange={this.onChange} onLoad={this.onLoad}>
        {child}
      </Ons.PullHook>
    );
  }
});

var MyPage  = React.createClass({
  render: function() {
    return <Ons.Page >
      <MyPullHook />

    <Ons.Toolbar>
      <div className="center">Pull to refresh</div>
    </Ons.Toolbar>

    <Ons.List
      dataSource={[1, 2, 3, 4]}
      renderRow={(data) => <Ons.ListItem>{data}</Ons.ListItem>} />
  </Ons.Page>
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
