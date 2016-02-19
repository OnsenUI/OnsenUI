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

var MyTab = React.createClass({
  render: function() {
    return (
      <OnsTab {...this.props}>
        <ons-tab-active>
          {this.props.title.toUpperCase()}
        </ons-tab-active>
        <ons-tab-inactive>
          {this.props.title.toLowerCase()}
        </ons-tab-inactive>
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
