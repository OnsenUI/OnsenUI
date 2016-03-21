var MyPage2  = React.createClass({
  render: function() {
    return (
      <OnsPage>
        <OnsToolbar>
          <div className="center">Description</div>
        </OnsToolbar>
        <br />
        <div style={{textAlign: 'center'}}>
          <OnsInput value={this.props.description} onChange={this.props.onChange} />
          <p>
            <OnsButton modifier="light" onClick={this.props.popPage}>Previous</OnsButton>
          </p>
        </div>
      </OnsPage>
    );
  }
});


var a;
var b;

var MyDialog = React.createClass({
  componentDidMount: function() {
    console.log('mounting 1');
  },
  popPage: function() {
   this.refs.navi.popPage();
  },
  pushPage: function() {
    this.refs.navi.pushPage(<MyPage2 description={this.props.description} onChange={this.onDescriptionChanged} popPage={this.popPage} />);
  },
  getInitialState: function() {
    return {value: ''};
  },
  onNameChanged: function(event) {
    this.props.onNameChanged(event.target.value);
  },
  onDescriptionChanged: function(event) {
    console.log('description changed');
    this.props.onDescriptionChanged(event.target.value);
  },
  render: function() {
    return (
    <OnsDialog onCancel={this.props.onCancel} isOpen={this.props.isOpen} style={{height: 250}} animation="default" cancelable>
      <OnsNavigator animation="slide" ref="navi">
        <OnsPage>
          <OnsToolbar>
          <div className="center">Name</div>
          </OnsToolbar>
          <br />
          <div style={{textAlign: 'center'}}>
            <OnsInput value={this.props.name} onChange={this.onNameChanged}  />
            <p>
              <OnsButton modifier="light"  onClick={this.pushPage}>Next</OnsButton>
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
    return {dialogOpen: false, name: '', description: ''};
  },
  hide: function() {
    this.setState({dialogOpen: false});
  },
  onNameChanged: function(value) {
    this.setState({name: value});
  },
  onDescriptionChanged: function(value) {
    this.setState({description: value});
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
        <OnsButton onClick={this.hello}>Hello  </OnsButton>
        <OnsButton onClick={this.showAlert}> Show Alert </OnsButton>
        <div> Name : {this.state.name} </div>
        <div> Description : {this.state.description} </div>
      </div>
      <MyDialog onCancel={this.hide} name={this.state.name} description={this.state.description}
        onNameChanged={this.onNameChanged}
        onDescriptionChanged={this.onDescriptionChanged}
        isOpen={this.state.dialogOpen}  />
    </OnsPage>
    );
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
