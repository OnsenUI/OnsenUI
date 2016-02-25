var MyPage  = React.createClass({
  getInitialState: function() {
    return {alertOpen: false};
  },
  showAlert: function() {
    this.setState({alertOpen: true});
  },
  showAlert2: function() {
    ons.notification.alert({
      message: 'You pressed "ok"'
    });
  },
  okClick : function() {
    this.setState({alertOpen: false});
  },
  render: function() {
    return (
    <OnsPage>
      <div style={{textAlign: 'center'}}>
        <h1>Page Content</h1>
        <ons-button onClick={this.showAlert}> Show Alert </ons-button>
        <ons-button onClick={this.showAlert2}> Show Alert 2 </ons-button>
      </div>
      <OnsAlertDialog ref="dialog" isOpen={this.state.alertOpen} animation="default" cancelable>
        <div className="alert-dialog-title">Warning!</div>
          <div className="alert-dialog-content">
          An error has occurred!
          </div>
        <div className="alert-dialog-footer">
        <button onClick={this.okClick} className="alert-dialog-button">OK</button>
        </div>
      </OnsAlertDialog>
    </OnsPage>
    );
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
