var FirstPage = React.createClass({
 getInitialState: function() {
    return { };
  },
  render: function() {
    return <OnsPage>
      <ons-toolbar>
        <div className="left"><ons-back-button>Back</ons-back-button></div>
        <div className="center">{ this.props.index }</div>
      </ons-toolbar>
      <ons-button onClick={this.props.pushPage}>Push!</ons-button>
    </OnsPage>;
  }
});

var SecondPage = React.createClass({
 getInitialState: function() {
    return { };
  },
  render: function() {
    return <OnsPage>
        <ons-toolbar>
          <div className="left"><OnsBackButton>Back </OnsBackButton></div>
          <div className="center">{ this.props.index }</div>
        </ons-toolbar>
        <br />
        <ons-button onClick={this.props.pushPage}>Push</ons-button>
        <ons-button onClick={this.props.popPage}>Pop</ons-button>
      </OnsPage>;
  }
});

var App = React.createClass({
  pushPage: function() {
    this.index++;
    this.refs.navi.pushPage(
      { comp: SecondPage,
        props: {index: this.index, pushPage: this.pushPage, popPage: this.popPage}
      }
    );
  },

  popPage: function() {
    this.refs.navi.popPage();
  },

  renderScene: function(route, navigator) {
    return React.createElement(route.comp, route.props);
  },

  componentDidMount: function() {
    this.index = 0;
  },

  render: function() {
    return (
      <OnsNavigator id="myNav" animation="fade" ref="navi"
        initialRoute={{comp: FirstPage, props: {index: 0, pushPage: this.pushPage}}}
        renderScene={this.renderScene} >
      </OnsNavigator>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
