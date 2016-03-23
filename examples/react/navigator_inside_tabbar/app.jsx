

var NavPage = React.createClass({
  render: function() {
    return (
      <Ons.Page {...this.props}>
        <ons-toolbar>
          <div className="center"> {this.props.title} </div>
        </ons-toolbar>
        <div style={{textAlign: 'center'}}>
          <br />
          <ons-button onClick={this.props.popPage}> Pop me </ons-button>
        </div>
      </Ons.Page>
    );
  },
});

var FirstPage = React.createClass({
  getInitialState: function() {
    return { };
  },
  render: function() {
    return (<Ons.Page {...this.props}>
      <ons-toolbar>
        <div className="center"> {this.props.title} </div>
      </ons-toolbar>
      <div style={{textAlign: 'center'}}>
        <br />
        <ons-button onClick={this.props.pushPage}> Push me </ons-button>
      </div>
    </Ons.Page>);
  }
});


var Nav = React.createClass({
  popPage: function() {
    this.refs.nav.popPage();
  },
  renderScene: function(route, navigator) {
    return React.createElement(route.comp, route.props);
  },
  pushPage: function() {
    this.refs.nav.pushPage(
      {comp: NavPage,
        props: {title: 'Page 2', popPage: this.popPage}
      }
    );
  },
  render: function() {
    return (
      <Ons.Page>
        <Ons.Navigator ref="nav" initialRoute={{comp: FirstPage, props: {title: this.props.title, pushPage: this.pushPage}}}
          renderScene={this.renderScene} />
      </Ons.Page>
    );
  },
});

var MyPage = React.createClass({
  render: function() {
    return (
      <Ons.Page {...this.props}>
        <ons-toolbar>
          <div className="center"> {this.props.title} </div>
        </ons-toolbar>
        <div> {this.props.content} </div>
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
        <Ons.Tabbar
          initialIndex={1}
          renderTabs={() => [
            {
              content: <Nav title="Page 1" />,
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
      </div>);
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
