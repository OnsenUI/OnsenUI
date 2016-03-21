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
        {this.props.resetPage ? <ons-button style={{marginLeft: 10}} onClick={this.props.resetPage}> Reset to page 1 </ons-button> : ''}
        {this.props.resetPageCustom ? <ons-button style={{marginLeft: 10}} onClick={this.props.resetPageCustom }> Reset to custom Component </ons-button> : ''}
        <div style={{flex: 1}} />
      </div>
    </OnsPage>
  }
});

var MyNav  = React.createClass({
  getInitialState: function() {
    return {};
  },

  resetPageCustom: function() {
    this.refs.navi.resetToPage(
      <MyPage title="A different page" popPage={this.popPage} pushPage={this.pushPage}  />
    );
    this.counter = 1;
  },



  resetPage: function() {
    this.refs.navi.resetToPage();
    this.counter = 1;
  },

  popPage: function() {
    this.counter--;
    this.refs.navi.popPage();
  },

  pushPage: function() {
    console.log('pushPage');
    this.counter++;
    var navTitle = "Navigator "+ this.counter;

    this.refs.navi.pushComponent(
      <MyPage title={navTitle} 
        popPage={this.popPage} 
        pushPage={this.pushPage} 
        resetPage={this.resetPage} 
        resetPageCustom={this.resetPageCustom} 
      />
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
