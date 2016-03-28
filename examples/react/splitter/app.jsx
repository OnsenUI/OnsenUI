var MyPage = React.createClass({

  rightClick: function(){
    this.refs.rightMenu.open();
  },
  leftClick: function(){
    this.refs.leftMenu.open();
  },

  render: function() {
    return (
  <ons-splitter>
    <ons-splitter-side ref="leftMenu" side="left" width="200px" collapse swipeable>
      <Ons.Page>
        <Ons.Toolbar>
          <div className="center">content</div>
        </Ons.Toolbar>
      </Ons.Page>
    </ons-splitter-side>

    <ons-splitter-content>
      <Ons.Page>
        <Ons.Toolbar>
          <div className="center">ons-splitter-content</div>
        </Ons.Toolbar>

        <p style={{padding: 10}}>
          <ons-button onClick={this.leftClick}>toggle left menu</ons-button>
        </p>

        <p style={{padding: 10}}>
          <ons-button onClick={this.rightClick}>toggle right menu</ons-button>
        </p>

      </Ons.Page>
    </ons-splitter-content>

    <ons-splitter-side ref="rightMenu" side="right" width="300px" collapse swipeable threhold-ratio-should-open="0.4">
      <Ons.Page>
        <Ons.Toolbar>
          <div className="left">
            <Ons.ToolbarButton >Button</Ons.ToolbarButton>
          </div>
          <div className="center">ons-splitter-side</div>
        </Ons.Toolbar>

      </Ons.Page>
    </ons-splitter-side>
  </ons-splitter>);
  }
});


var MyNav  = React.createClass({
  getInitialState: function() {
    return {};
  },
  popPage: function() {

    this.counter--;
    this.refs.navi.popPage();
  },
  pushPage: function() {
    //console.log('push page');
    // this.setState({navNumber: this.state.navNumber +1});

    this.counter++;
    var navTitle = "Navigator "+ this.counter;

    this.refs.navi.pushComponent(
      <MyPage title={navTitle} popPage={this.popPage} pushPage={this.pushPage} />
    );
  },
  componentDidMount: function() {
    this.counter = 1;
  },
  render: function() {
    return <MyPage title="Navigator 1" pushPage={this.pushPage} />
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
