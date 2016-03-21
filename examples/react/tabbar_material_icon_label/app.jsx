var MyPage = React.createClass({
  render: function() {
    return (
      <OnsPage {...this.props}>
        <h2>{this.props.title}</h2>
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
   <OnsPage>
      <OnsToolbar modifier="material noshadow">
        <div className="left">
          <OnsToolbarButton modifier="material"><OnsIcon icon="md-menu"></OnsIcon></OnsToolbarButton>
        </div>
        <div className="center">
          Title
        </div>
        <div className="right">
          <OnsToolbarButton modifier="material"><OnsIcon icon="md-search"></OnsIcon></OnsToolbarButton>
          <OnsToolbarButton modifier="material"><OnsIcon icon="md-more-vert"></OnsIcon></OnsToolbarButton>
        </div>
      </OnsToolbar>
      <OnsTabbar position="top" modifier="material" 
        pages= {[
          <MyPage title="Search"  />,
          <MyPage title="Favorite" />,
          <MyPage title="Call" />,
          ]}
        >
        <OnsTab
          icon="md-search"
          label="search"
          active="true" />
        <OnsTab
          icon="md-favorite"
          label="favorite" />
        <OnsTab
          icon="md-phone"
          label="phone" />
      </OnsTabbar>
    </OnsPage>
  </div>);
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
