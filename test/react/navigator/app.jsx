var MyPage = React.createClass({
  getInitialState: function() {
      return { };
  },
  pushPage : function() {
   this.props.pushPage();
  },
  popPage : function() {
   this.props.popPage();
  },

  render: function() {

    var popButton;

    if (this.props.popPage) { 
      popButton =<ons-button id={'pop_' + this.props.id} 
      style={{marginRight: 10}} onClick={this.popPage}> Pop </ons-button>
    }

    return <OnsPage id={this.props.id}>
      <ons-toolbar>
        <div className="center"> {this.props.title} </div>
      </ons-toolbar>
      <div style={{display: 'flex'}}> 
        <div style={{flex: 1}} />
        {popButton}
        <ons-button id={'push_' + this.props.id} onClick={this.pushPage}> Push </ons-button>
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

  pushPage: function() {
    //console.log('push page');
    // this.setState({navNumber: this.state.navNumber +1});

    this.counter++;
    var navTitle = "Navigator "+ this.counter;

    var id='page_' + this.counter;

    this.refs.navi.pushComponent(
      <MyPage title={navTitle} id={id} popPage={this.popPage} pushPage={this.pushPage} />, {animation: 'none'}
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
