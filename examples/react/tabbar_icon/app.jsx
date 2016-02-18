var MyPage = React.createClass({
  render: function() {
    return (
      <OnsPage {...this.props}>
         <ons-toolbar>
            <div className="center">{this.props.title}</div>
          </ons-toolbar>
       </OnsPage>
    );
  },
});

var MyNav  = React.createClass({
  getInitialState: function() {
    return {};
  },
  
  render: function() {
    return (
    <div> 
      <OnsTabbar>
        <OnsTab
          icon="ion-home"
          active="true"
          page = { <MyPage  title="Home"/> }>
        </OnsTab>
    <OnsTab
          icon="ion-chatbox-working"
          page = { <MyPage title="Chat" /> }>
        </OnsTab>
      <OnsTab
          icon="ion-ios-cog"
          page = { <MyPage title="Settings" /> }>
      </OnsTab>
    </OnsTabbar>
  </div>);
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
