var MyPage = React.createClass({
  render: function() {
    var popButton;
    var replaceButton;

    if (this.props.popPage) { 
      popButton = <ons-button id={'pop_' + this.props.id} 
        style={{marginRight: 10}} onClick={this.props.popPage}> Pop </ons-button>
    } 

    if (this.props.replacePage) {
     replaceButton = <ons-button id={'replace_' + this.props.id} style={{marginLeft: 10}} onClick={this.props.replacePage}> Replace </ons-button>;
    }

    return <OnsPage id={this.props.id}>
      <ons-toolbar>
        <div className="center" id={'title_' + this.props.id}> {this.props.title} </div>
      </ons-toolbar>
      <div style={{display: 'flex'}}> 
        <div style={{flex: 1}} />
        {popButton}
        <ons-button 
          id={'push_' + this.props.id} 
          onClick={this.props.pushPage}> 
          Push 
        </ons-button>
        {replaceButton}
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
    console.log('replace page');
    var id='page_' + this.counter;
    this.refs.navi.replacePage(
          <MyPage title="Replaced Page" id={id} popPage={this.popPage} pushPage={this.pushPage} />, {animation: 'none'}
        );
  },

  pushPage: function() {
    this.counter++;
    var navTitle = "Navigator "+ this.counter;

    var id='page_' + this.counter;

    this.refs.navi.pushComponent(
      <MyPage title={navTitle} id={id} replacePage={this.replacePage} popPage={this.popPage} pushPage={this.pushPage} />, {animation: 'none'}
    );
  },

  componentDidMount: function() {
    this.counter = 1;
  },
  
  render: function() {
    return <OnsNavigator id="mynav" ref="navi">
      <MyPage title="Navigator 1" id="page_1" pushPage={this.pushPage} />
    </OnsNavigator>
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
