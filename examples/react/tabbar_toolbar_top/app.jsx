var MyPage = React.createClass({
  render: function() {
    return (
      <OnsPage {...this.props}>
        <div style={{textAlign: 'center'}}>
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
              <br />
              <br />
              <br />
              <p>last</p>
        </div>
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
      <OnsPage>
        <ons-toolbar>
          <div className="center">Title</div>
        </ons-toolbar>
      <OnsTabbar
          position="top" var="tabbar" modifier="top-border"
        pages= {[
          <MyPage />,
          <MyPage />,
          <MyPage />
          ]} >

          <OnsTab icon="ion-home" active="true" />
          <OnsTab icon="ion-chatbox-working"  />
          <OnsTab icon="ion-ios-cog"  />
        </OnsTabbar>
      </OnsPage>
    );
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
