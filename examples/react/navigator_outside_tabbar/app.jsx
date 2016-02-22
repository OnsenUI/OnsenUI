var TabPage = React.createClass({
  render: function() {
    return (<OnsPage>
          <OnsTabbar
            pages= {[
              <MyPage title="Page 1 "   content="Home " />,
              <MyPage title="Settings "  content="Settings content" />,
            ]}
            >
            <OnsTab
              active="true"
            icon="gear"
            label="Settings" />
          <OnsTab
            icon="star"
            label="Favorite" />
        </OnsTabbar>
      </OnsPage>);
  }
});
var MyPage = React.createClass({
  render: function() {

    var pushButton;
    var popButton;

    if (this.props.pushPage) {
      pushButton = <ons-button onClick={this.props.pushPage}> Push Page</ons-button>;
    }

    if (this.props.popPage) {
      popButton = <ons-button onClick={this.props.popPage}> Pop Page</ons-button>;
    }

    return (
      <OnsPage {...this.props}>
          <ons-toolbar>
            <div className="center"> {this.props.title} </div>
          </ons-toolbar>
            {pushButton}
            {popButton}
          <div> {this.props.content} </div>
        </OnsPage>
    );
  },
});

var MyNav  = React.createClass({
  getInitialState: function() {
    return {};
  },

  tabPage: function() {

    this.refs.nav.pushComponent(<TabPage />);
  },
  pushPage: function() {
    this.refs.nav.pushComponent(<MyPage title="Pushed Page " pushPage={this.tabPage} popPage={this.popPage} content="This page is special" />);
  },

  popPage: function() {
    this.refs.nav.popPage();
  },
  
  render: function() {
    return (
      <OnsNavigator ref="nav">
        <OnsPage>
          <OnsTabbar
            pages= {[
              <MyPage title="Page 1 " pushPage={this.pushPage}  content="Home " />,
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
