var OnsTabbar = React.createClass({
  componentDidMount: function() {
    const node = ReactDOM.findDOMNode(this);
    node.setActiveTab(this.props.initialIndex || 0);
  },

  setActiveTab: function(index, options) {
    ReactDOM.findDOMNode(this).setActiveTab(index, options);
  },

  getActiveTabIndex: function() {
    return ReactDOM.findDOMNode(this).getActiveTabIndex();
  },

  render: function() {
    const tabs = this.props.renderTabs(this);

    return (
      <ons-tabbar {...this.props} _compiled="true">
        <div no-status-bar-fill className="ons-tab-bar__content tab-bar__content">
          {tabs.map((tab) => tab.content)}
        </div>
        <div className="tab-bar ons-tab-bar__footer ons-tabbar-inner">
          {tabs.map((tab) => tab.tab)}
        </div>
      </ons-tabbar>
    );
  }
});

var OnsTab = React.createClass({
  render: function() {
    return <ons-tab {...this.props}></ons-tab>;
  }
});
