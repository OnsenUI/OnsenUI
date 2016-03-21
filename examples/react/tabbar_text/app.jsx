var HTMLDOMLegacyPropertyConfig = {
  isCustomAttribute: function(attributeName) {
    return -1 !== [
      'OnsTabActive'
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

var MyTab = React.createClass({
  render: function() {
    return (
      <OnsTab {...this.props}>
        <OnsTabActive>
          {this.props.title.toUpperCase()}
        </OnsTabActive>
        <OnsTabInactive>
          {this.props.title.toLowerCase()}
        </OnsTabInactive>
      </OnsTab>
    );
  },
});

var MyNav  = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <OnsTabbar
        pages= {[
          <MyPage title="Home"  content="Home content" />,
          <MyPage title="Comments"  content="Comment content" />,
          <MyPage title="Settings"  content="Setting content" />
          ]}>
      <MyTab active="true" title="home" />
      <MyTab  title="comments" />
      <MyTab  title="settings" />
    </OnsTabbar>
    );
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
