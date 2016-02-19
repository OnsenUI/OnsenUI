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
      <OnsTabbar
        pages= {[
          <MyPage title="Home"  content="Home content" />,
          <MyPage title="Comments"  content="Comment content" />,
          <MyPage title="Settings"  content="Setting content" />
        ]}
        >
      <OnsTab active="true">
        <ons-tab-active>
          HOME
        </ons-tab-active>
        <ons-tab-inactive>
          home
        </ons-tab-inactive>
      </OnsTab>
      <OnsTab
        icon="ion-chatbox-working"
        label="Comments" />
      <OnsTab
        icon="ion-ios-cog"
        label="Settings" />
    </OnsTabbar>
    </div>);
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
