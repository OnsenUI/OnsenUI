var MyPage = React.createClass({
  render: function() {
    return (
    <OnsPage>
          <ons-toolbar>
            <div className="center"> {this.props.title} </div>
          </ons-toolbar>
          <div> {this.props.content} </div>
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
        mypage= {
          <MyPage title="Home"  content="Home content" />
        }
        >
      <OnsTab
        active="true" 
        page="page1.html"
        >
        <div ons-tab-active>
          HOME
        </div>
        <div ons-tab-inactive>
          home
        </div>
      </OnsTab>
      <OnsTab
        page="page2.html"
        icon="ion-chatbox-working"
        label="Comments">
      </OnsTab>
      <OnsTab
        icon="ion-ios-cog"
        page="page3.html"
        label="Settings"
        ></OnsTab>
    </OnsTabbar>
    <OnsTemplate id="page1.html"> 
      <MyPage title="Home" content="Home content" />
    </OnsTemplate>
    <OnsTemplate id="page2.html"> 
      <MyPage title="Comments" content="Comment content" />
    </OnsTemplate>
    <OnsTemplate id="page3.html"> 
      <MyPage title="Settings" content="Settings content" />
    </OnsTemplate>
  </div>);
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
