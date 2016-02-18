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
        <ons-tab-active>
          HOME
        </ons-tab-active>
        <ons-tab-inactive>
          home
        </ons-tab-inactive>
      </OnsTab>
      <OnsTab
        page = {
          <MyPage title="Comments"  content="Comment content" />
        }
        >
        <ons-tab-active>
          COMMMENTS 
        </ons-tab-active>
        <ons-tab-inactive>
          comments
        </ons-tab-inactive>

      </OnsTab>
      <OnsTab
        page = {
          <MyPage title="Settings"  content="Setting content" />
        }
        >
        <ons-tab-active>
          SETTINGS 
        </ons-tab-active>
        <ons-tab-inactive>
          settings
        </ons-tab-inactive>
      </OnsTab>
    </OnsTabbar>
   </div>);
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
