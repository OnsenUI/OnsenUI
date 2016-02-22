
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
      <OnsNavigator>
        <OnsPage>
          <OnsTabbar
            pages= {[
              <MyPage title="Settings "  content="Settings content" />,
              <MyPage title="Favorite "  content="Favorite content" />
            ]}
            >
            <OnsTab 
              icon="home"
              label="Page1"
              active="true" />
          <OnsTab
            icon="gear"
            label="Settings" />
          <OnsTab
            icon="star"
            label="Favorite" />
        </OnsTabbar>
      </OnsPage>
    </OnsNavigator>
    );
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
