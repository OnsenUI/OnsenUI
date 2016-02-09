
var MyPage = React.createClass({
  getInitialState: function() {
      return { };
  },
  render: function() {
    return <OnsPage>
      <ons-toolbar>
        <div className="center"> {this.props.title} </div>
      </ons-toolbar>
      <div style={{display: 'flex'}}> 
        <div style={{flex: 1}} />
        <ons-button onClick={this.props.pushPage}> Push </ons-button>
        {this.props.popPage ?<ons-button style={{marginLeft: 10}} onClick={this.props.popPage}> Pop </ons-button> :''}
        {this.props.replacePage ? <ons-button style={{marginLeft: 10}} onClick={this.props.replacePage}> Replace Page </ons-button> : ''}
        <div style={{flex: 1}} />
      </div>
    </OnsPage>
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

  replacePage: function() {
    this.refs.navi.replacePage(
      <MyPage title="Replaced Page" popPage={this.popPage} pushPage={this.pushPage} />
    );
  },

  pushPage: function() {
    this.counter++;
    var navTitle = "Navigator "+ this.counter;

    this.refs.navi.pushComponent(
      <MyPage title={navTitle} popPage={this.popPage} pushPage={this.pushPage} replacePage={this.replacePage} />
    );
  },

  componentDidMount: function() {
    this.counter = 1;
  },
  
  render: function() {
    return <OnsNavigator ref="navi">
      <MyPage title="Navigator 1" pushPage={this.pushPage} />
    </OnsNavigator>
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
