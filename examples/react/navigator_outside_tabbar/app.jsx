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
      <Ons.Page {...this.props}>
          <ons-toolbar>
            <div className="center"> {this.props.title} </div>
          </ons-toolbar>
            {pushButton}
            {popButton}
          <div> {this.props.content} </div>
        </Ons.Page>
    );
  },
});

var FirstPage = React.createClass({
 getInitialState: function() {
    return { };
  },
  render: function() {
    return (<Ons.Page>
          <Ons.Tabbar
            initialIndex={0}
            renderTabs={() => [
              {
                content: <MyPage title="Page 1" pushPage={this.props.pushPage} content="Home" />,
                tab: <Ons.Tab icon="home" label="Page1" />
              },
              {
                content: <MyPage title="Settings" content="Settings content" />,
                tab: <Ons.Tab icon="gear" label="Settings" />
              },
              {
                content: <MyPage title="Favorite" content="Favorite content" />,
                tab: <Ons.Tab icon="star" label="Favorite" />
              }
            ]} />
      </Ons.Page>);
  }
});

var MyNav  = React.createClass({
  getInitialState: function() {
    return {};
  },

  pushPage: function() {
    var props = {
      title: 'Pushed Page',
      popPage: this.popPage,
      content: 'This page is special'
    };

    this.refs.nav.pushPage({comp: MyPage, props: props});
  },

  popPage: function() {
    this.refs.nav.popPage();
  },
 renderScene: function(route, navigator) {
   return React.createElement(route.comp, route.props);
 },
  render: function() {
    return (
      <Ons.Navigator ref="nav" initialRoute={{comp: FirstPage, props: {pushPage: this.pushPage}}}
        renderScene={this.renderScene}
        />
    );
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
