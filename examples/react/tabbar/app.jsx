var HTMLDOMLegacyPropertyConfig = {
  isCustomAttribute: function(attributeName) {
    return -1 !== [
      'ons-tab-active'
     ].indexOf(attributeName);
  },
  Properties: {
    align: null,
    bgcolor: null,
    border: null
  },
  DOMAttributeNames: {
  },
  DOMPropertyNames: {
  }
};

var MyPage = React.createClass({
  render: function() {
    return (
      <OnsPage {...this.props}>
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
      <OnsTabbar>
      <OnsTab
        active="true" 
        page = {
          <MyPage title="Home"  content="Home content" />
        }>
        <div ons-tab-active>
          HOME
        </div>
        <div ons-tab-inactive>
          home
        </div>
      </OnsTab>
      <OnsTab
        page = {
          <MyPage title="Comments"  content="Comment content" />
        }
        icon="ion-chatbox-working"
        label="Comments">
      </OnsTab>
      <OnsTab
        icon="ion-ios-cog"
        page = {
          <MyPage title="Settings"  content="Setting content" />
        }
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
