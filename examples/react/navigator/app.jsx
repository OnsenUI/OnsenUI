var App = React.createClass({
  pushPage: function() {
    this.refs.navi.pushPage(
      <OnsPage>
        <ons-toolbar>
          <div className="center">{ this.index }</div>
        </ons-toolbar>
        <br />
        <ons-button onClick={this.pushPage}>Push</ons-button>
        <ons-button onClick={this.popPage}>Pop</ons-button>
      </OnsPage>
    );

    this.index++;
  },

  popPage: function() {
    this.refs.navi.popPage();
  },

  componentDidMount: function() {
    this.index = 0;
    this.pushPage();
  },

  render: function() {
    return <OnsNavigator id="myNav" ref="navi"></OnsNavigator>
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
