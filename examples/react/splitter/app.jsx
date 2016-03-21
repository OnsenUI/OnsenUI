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
      <OnsPage>
        <OnsToolbar>
          <div className="center">content</div>
        </OnsToolbar>
      </OnsPage>
    </ons-splitter-side>

    <ons-splitter-content>
      <OnsPage>
        <OnsToolbar>
          <div className="center">ons-splitter-content</div>
        </OnsToolbar>

        <p style={{padding: 10}}>
          <ons-button onClick={this.leftClick}>toggle left menu</ons-button>
        </p>

        <p style={{padding: 10}}>
          <ons-button onClick={this.rightClick}>toggle right menu</ons-button>
        </p>

      </OnsPage>
    </ons-splitter-content>

    <ons-splitter-side ref="rightMenu" side="right" width="300px" collapse swipeable threhold-ratio-should-open="0.4">
      <OnsPage>
        <OnsToolbar>
          <div className="left">
            <OnsToolbarButton >Button</OnsToolbarButton>
          </div>
          <div className="center">ons-splitter-side</div>
        </OnsToolbar>

      </OnsPage>
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
