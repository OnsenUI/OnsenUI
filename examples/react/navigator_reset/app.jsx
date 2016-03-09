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
        <ons-button class="space" onClick={this.props.pushPage}>Push</ons-button>
        <ons-button class="space" onClick={this.props.popPage}>Pop</ons-button>
        <ons-button class="space" onClick={this.props.resetPage}>Reset</ons-button>
        <ons-button class="space" onClick={this.props.resetStack}>Reset Stack</ons-button>
      </OnsPage>;
  }
});

var App = React.createClass({
  pushPage: function() {
    this.index++;
    this.refs.navi.pushPage(
      { comp: SecondPage,
        props: {index: this.index, pushPage: this.pushPage, popPage: this.popPage, resetPage: this.resetPage, resetStack: this.resetStack }
      }
    ).then(() => console.log('page pushed'));
  },

  popPage: function() {
    this.index--;
    this.refs.navi.popPage().then(() => console.log('page popped'));
  },
  resetPage: function() {
    this.index = 0;
    this.refs.navi.resetPage({comp: FirstPage, props: {index: 'Reset Page', pushPage: this.pushPage}}).then(() => console.log('page resetted'));
  },

  renderScene: function(navigator, route) {
    return React.createElement(route.comp, route.props);
  },

  componentDidMount: function() {
    this.index = 0;
  },

  resetStack: function() {
    this.index = 0;
    this.refs.navi.resetPageStack(
      [
        {comp: FirstPage, props: {index: 'Reset Page 1', pushPage: this.pushPage}},
        {comp: SecondPage, props: {index: 'Reset Page 2', pushPage: this.pushPage, popPage: this.popPage, resetPage: this.resetPage, resetStack: this.resetStack}},
        {comp: SecondPage, props: {index: 'Reset Page 3', pushPage: this.pushPage, popPage: this.popPage, resetPage: this.resetPage, resetStack: this.resetStack}}
      ]).then(() => console.log('page stack resetted'));
  },

  render: function() {
    return (
      <OnsNavigator id="myNav" animation="fade" ref="navi"
        initialRoutes={[
        {comp: FirstPage, props: {index: 'Page 1', pushPage: this.pushPage}},
        {comp: SecondPage, props: {index: 'Page 2', pushPage: this.pushPage, popPage: this.popPage, resetPage: this.resetPage, resetStack: this.resetStack}
        }
        ]}
        renderScene={this.renderScene} >
      </OnsNavigator>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
