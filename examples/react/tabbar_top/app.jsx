var MyPage = React.createClass({
  render: function() {
    return (
      <OnsPage {...this.props}>
        <div style={{textAlign: 'center'}}>
          {[1,2,3,4,5, 'last'].map(function(i) { return <p>{i}</p>})}
        </div>
      </OnsPage>
    );
  },
});

var MyPage2 = React.createClass({
  render: function() {
    return (
      <OnsPage {...this.props}>
        <OnsToolbar  modifier="transparent"> <div className="center"> {this.props.title} </div></OnsToolbar>
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
      <OnsTabbar
          position="top" var="tabbar"
        pages= {[
          <MyPage />,
          <MyPage2 title="Page 2"/>,
          <MyPage2 title="Page 3" />
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
