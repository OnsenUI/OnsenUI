var MyPage = React.createClass({
  render: function() {
    return (
      <OnsPage {...this.props}>
         <ons-toolbar>
            <div class="center">Page</div>
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
          page = { <MyPage /> }>
        </OnsTab>
    <OnsTab
          icon="ion-chatbox-working"
          page = { <MyPage /> }>
        </OnsTab>
      <OnsTab
          icon="ion-ios-cog"
          page = { <MyPage /> }>
      </OnsTab>
    </OnsTabbar>
  </div>);
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
