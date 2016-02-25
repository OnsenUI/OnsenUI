var MyDialog = React.createClass({
  okClick: function() {
    this.refs.dialog.hide();
  },
  render: function() {
    return (
    <ons-alert-dialog ref="dialog" animation="default" cancelable>
      <div className="alert-dialog-title">Warning!</div>
        <div className="alert-dialog-content">
        An error has occurred!
        </div>
      <div className="alert-dialog-footer">
      <button onClick={this.okClick} className="alert-dialog-button">OK</button>
      </div>
    </ons-alert-dialog>
    );
  },
});



var MyPage  = React.createClass({
  showAlert: function() {
    reactUtil.createCustomDialog(
      <MyDialog />
    ).then(function(obj) {
      obj.show();
    });
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
        <ons-button onClick={this.showAlert}> Show Alert </ons-button>
        <ons-button onClick={this.showAlert2}> Show Alert 2 </ons-button>
      </div>
    </OnsPage>
    );
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
