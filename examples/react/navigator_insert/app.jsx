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

    return <OnsPage>
      <ons-toolbar>
        <div className="center"> {this.props.title} </div>
      </ons-toolbar>
      <div style={{textAlign: 'center'}}>
        <br />

      <ons-button modifier="light" onClick={this.props.insertPageBack}> 
        Insert Page to Background  (First)
      </ons-button>

      <br />

      <ons-button modifier="light" onClick={this.props.insertPageFront}> 
        Insert Page to Background  (Last)
      </ons-button>
      <br />
     <ons-button modifier="light" onClick={this.props.popPage}> 
        Pop Page 
      </ons-button>

      </div>
    </OnsPage>
  }
});


var MyNav  = React.createClass({
  getInitialState: function() {
    this.counter = 0;
    return {};
  },

  popPage: function() {
    this.refs.navi.popPage();
  },

  insertPage: function(pos) {
    this.counter++;
    var counterStr = ""+ this.counter;
    var Title = "Back Page " + this.counter;
    console.log('counterStr');
    console.log(counterStr);
    this.refs.navi.insertComponent(
      <MyPage key={counterStr} title={Title}
        insertPage={this.insertPage} popPage={this.popPage}
      />, pos
    );
  },
  
  render: function() {
    return <OnsNavigator ref="navi">
      <MyPage key="0" 
        title="Navigator" 
        insertPageFront={this.insertPage.bind(this, 0)}
        insertPageBack={this.insertPage.bind(this,-1)}
        popPage={this.popPage}
        
        popPage={this.popPage}/>
    </OnsNavigator>
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
