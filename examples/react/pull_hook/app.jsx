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
      child = <span ><ons-icon size="35px" spin="false" icon="ion-arrow-down-a"></ons-icon> Pull down to refresh</span>;
    } else if (this.state.pullHookState == 'preaction') {
      child = <span><ons-icon  size="35px" spin="false" icon="ion-arrow-up-a"></ons-icon> Release to refresh</span>;
    } else {
      child = <span><ons-icon size="35px" spin="true" icon="ion-load-d"></ons-icon> Loading data...</span>;
    }

    return (
      <OnsPullHook onChange={this.onChange} onLoad={this.onLoad}>
        {child}
      </OnsPullHook>
    );
  }
});

var MyPage  = React.createClass({
  render: function() {
    return <OnsPage >
      <MyPullHook />

    <ons-toolbar>
      <div className="center">Pull to refresh</div>
    </ons-toolbar>

    <ons-list>
      {[1,2,3,4,5].map( function(num) {
        return (
      <ons-list-item >
        {'Item ' + num}
      </ons-list-item>
      )
      })}
    </ons-list>
  </OnsPage>
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
