var MyPage = React.createClass({
  render: function() {
    return (
      <Ons.Page {...this.props}>
        <h2>{this.props.title}</h2>
      </Ons.Page>
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
   <Ons.Page>
      <Ons.Toolbar modifier="material noshadow">
        <div className="left">
          <Ons.ToolbarButton modifier="material"><Ons.Icon icon="md-menu"></Ons.Icon></Ons.ToolbarButton>
        </div>
        <div className="center">
          Title
        </div>
        <div className="right">
          <Ons.ToolbarButton modifier="material"><Ons.Icon icon="md-search"></Ons.Icon></Ons.ToolbarButton>
          <Ons.ToolbarButton modifier="material"><Ons.Icon icon="md-more-vert"></Ons.Icon></Ons.ToolbarButton>
        </div>
      </Ons.Toolbar>
      <Ons.Tabbar position="top" modifier="material" 
        initialIndex={1}
        renderTabs={() => [
          {
            content: <MyPage title="Search" />,
            tab: <Ons.Tab icon="md-search" label="search" />
          },
          {
            content: <MyPage title="Favorite" />,
            tab: <Ons.Tab icon="md-favorite" label="favorite" />
          },
          {
            content: <MyPage title="Call" />,
            tab: <Ons.Tab icon="md-phone" label="Call" />
          },
        ]} />
    </Ons.Page>
  </div>);
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
