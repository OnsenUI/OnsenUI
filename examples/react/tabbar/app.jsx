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
          <OnsToolbar>
            <div className="center"> {this.props.title} </div>
          </OnsToolbar>
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
        <OnsTabActive>
          HOME
        </OnsTabActive>
        <OnsTabInactive>
          home
        </OnsTabInactive>
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
