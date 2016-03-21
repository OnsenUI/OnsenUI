var MyPage = React.createClass({
  render: function() {
    return (
      <OnsPage {...this.props}>
         <OnsToolbar>
           <div className="center">{this.props.title}</div>
         </OnsToolbar>
         <div>{this.props.content}</div>
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
      <OnsTabbar
        pages= {[
          <MyPage title="Home"  content="Home content" />,
          <MyPage title="Comments"  content="Comment content" />,
          <MyPage title="Settings"  content="Setting content" />
        ]}>
        <OnsTab icon="ion-home" active="true" />
        <OnsTab icon="ion-chatbox-working" />
        <OnsTab icon="ion-ios-cog" />
    </OnsTabbar>
  </div>);
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
