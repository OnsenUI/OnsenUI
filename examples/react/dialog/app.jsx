var MyPage2  = React.createClass({
  render: function() {
    return (
      <OnsPage>
        <ons-toolbar>
          <div className="center">Description</div>
        </ons-toolbar>
        <br />
        <div style={{textAlign: 'center'}}>
          <ons-input id="description"></ons-input>
          <p>
            <ons-button modifier="light" onClick={this.props.popPage}>Previous</ons-button>
          </p>
        </div>
      </OnsPage>
    );
  }
});



var MyDialog = React.createClass({
  getInitialState: function() {
    return {name: ''};
  },
  okClick: function() {
    this.refs.dialog.hide();
  },
  popPage: function() {
   this.refs.navi.popPage(); 
  },
  next: function() {
    console.log('click this dialog');
    this.refs.navi.pushComponent(<MyPage2 popPage={this.popPage} />);
  },
  handleChange: function(event) {
    this.setState({name: event.target.value});
  },
  render: function() {
    return (
    <OnsDialog onCancel={this.props.onCancel} isOpen={this.props.isOpen} style={{height: 250}} animation="default" cancelable>
      <OnsNavigator animation="slide" ref="navi">
        <OnsPage>
          <ons-toolbar>
            <div className="center">Name</div>
          </ons-toolbar>
          <br />
            <div style={{textAlign: 'center'}}>
              <ons-input id="name" value={this.state.name} onChange={this.handleChange} label="Name"></ons-input>
              <p>
                <ons-button modifier="light" onClick={this.next}>Next</ons-button>
              </p>
            </div>
          </OnsPage>
      </OnsNavigator>
    </OnsDialog>
    );
  },
});

var MyPage  = React.createClass({
  getInitialState: function() {
    return {dialogOpen: false};
  },
  hide: function() {
    this.setState({dialogOpen: false});
  },
  hello: function() {
    this.setState({name: 'test'});
  },
  showAlert: function() {
    this.setState({dialogOpen: true});
  },
  showAlert2: function() {
    ons.notification.alert({
      message: 'You pressed "ok"'
    });
  },
  render: function() {
    return (
    <OnsPage>
      <div style={{textAlign: 'center'}}>
        <h1>Page Content</h1>
        <ons-button onClick={this.hello}>Hello  </ons-button>
        <ons-button onClick={this.showAlert}> Show Alert </ons-button>
      </div>
      <MyDialog onCancel={this.hide} isOpen={this.state.dialogOpen}  />
    </OnsPage>
    );
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
