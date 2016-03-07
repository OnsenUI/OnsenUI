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

var FirstPage = React.createClass({
 getInitialState: function() {
    return { };
  },
  render: function() {
    return (<OnsPage>
          <OnsTabbar
            pages= {[
              <MyPage title="Page 1 " pushPage={this.props.pushPage}  content="Home " />,
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
      </OnsPage>);
  }
});

var MyNav  = React.createClass({
  getInitialState: function() {
    return {};
  },

  tabPage: function() {

    this.refs.nav.pushPage(<TabPage />);
  },
  pushPage: function() {
    var props = {
      title: 'Pushed Page',
      pushPage: this.tabPage,
      popPage: this.popPage,
      content: 'This page is special'
    };

    this.refs.nav.pushPage({comp: MyPage, props: props});
  },

  popPage: function() {
    this.refs.nav.popPage();
  },
 renderScene: function(navigator, route) {
   return React.createElement(route.comp, route.props);
 },
  render: function() {
    return (
      <OnsNavigator ref="nav" initialRoute={{comp: FirstPage, props: {pushPage: this.pushPage}}}
        renderScene={this.renderScene}
        />
    );
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
