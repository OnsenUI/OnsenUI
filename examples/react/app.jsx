var MyPage = React.createClass({
  render: function() {
    return (
      <Ons.Page {...this.props}>
         <ons-toolbar>
            <div class="center">Page</div>
          </ons-toolbar>
       </Ons.Page>
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
      <Ons.Tabbar>
        <Ons.Tab
          icon="ion-home"
          active="true"
          page = { <MyPage /> }>
        </Ons.Tab>
    <Ons.Tab
          icon="ion-chatbox-working"
          page = { <MyPage /> }>
        </Ons.Tab>
      <Ons.Tab
          icon="ion-ios-cog"
          page = { <MyPage /> }>
      </Ons.Tab>
    </Ons.Tabbar>
  </div>);
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
