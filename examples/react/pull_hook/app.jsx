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
      child = <span ><OnsIcon size="35px" spin="false" icon="ion-arrow-down-a"></OnsIcon> Pull down to refresh</span>;
    } else if (this.state.pullHookState == 'preaction') {
      child = <span><OnsIcon  size="35px" spin="false" icon="ion-arrow-up-a"></OnsIcon> Release to refresh</span>;
    } else {
      child = <span><OnsIcon size="35px" spin="true" icon="ion-load-d"></OnsIcon> Loading data...</span>;
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

    <OnsToolbar>
      <div className="center">Pull to refresh</div>
    </OnsToolbar>

    <OnsList>
      {[1,2,3,4,5].map( function(num) {
        return (
      <OnsListItem >
        {'Item ' + num}
      </OnsListItem>
      )
      })}
    </OnsList>
  </OnsPage>
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
