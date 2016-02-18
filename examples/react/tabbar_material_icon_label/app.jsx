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
      <ons-toolbar modifier="material noshadow">
        <div className="left">
          <ons-toolbar-button modifier="material"><ons-icon icon="md-menu"></ons-icon></ons-toolbar-button>
        </div>
        <div className="center">
          Title
        </div>
        <div className="right">
          <ons-toolbar-button modifier="material"><ons-icon icon="md-search"></ons-icon></ons-toolbar-button>
          <ons-toolbar-button modifier="material"><ons-icon icon="md-more-vert"></ons-icon></ons-toolbar-button>
        </div>
      </ons-toolbar>
      <OnsTabbar position="top" modifier="material" var="tabbar">
        <OnsTab
          icon="md-search"
          label="search"
          active="true"
          page = { <MyPage  title="Search"/> }>
        </OnsTab>
        <OnsTab
          icon="md-favorite"
          label="favorite"
          page = { <MyPage  title="Favorite"/> }>
        </OnsTab>
        <OnsTab
          icon="md-phone"
          label="phone"
          page = { <MyPage  title="Call"/> }>
        </OnsTab>
      </OnsTabbar>
    </OnsPage>

  </div>);
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
