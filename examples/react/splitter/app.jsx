var MyPage = React.createClass({

  render: function() {


    return (
  <ons-splitter>
    <ons-splitter-side side="left" width="200px" collapse swipeable>
      <OnsPage>
        <ons-toolbar>
          <div className="center">content</div>
        </ons-toolbar>
      </OnsPage>
    </ons-splitter-side>

    <ons-splitter-content>
      <ons-page>
        <ons-toolbar>
          <div className="center">ons-splitter-content</div>
        </ons-toolbar>

        <p style={{padding: 10}}>
          <ons-button onclick="toggle('left')">toggle left menu</ons-button>
        </p>

        <p style={{padding: 10}}>
          <ons-button onclick="toggle('right')">toggle right menu</ons-button>
        </p>

      </ons-page>
    </ons-splitter-content>

    <ons-splitter-side side="right" width="300px" collapse swipeable threhold-ratio-should-open="0.4">
      <ons-page>
        <ons-toolbar>
          <div className="left">
            <ons-toolbar-button >Close</ons-toolbar-button>
          </div>
          <div className="center">ons-splitter-side</div>
        </ons-toolbar>

      </ons-page>
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
