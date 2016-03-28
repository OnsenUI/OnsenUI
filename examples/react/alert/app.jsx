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
  close: function() {
    this.setState({alertOpen: false});
  },
  render: function() {
    return (
    <Ons.Page>
      <div style={{textAlign: 'center'}}>
        <h1>Page Content</h1>
        <Ons.Button onClick={this.showAlert}> Show Alert </Ons.Button>
        <Ons.Button onClick={this.showAlert2}> Show Alert 2 </Ons.Button>
      </div>
      <Ons.AlertDialog ref="dialog" onCancel={this.close} isOpen={this.state.alertOpen} animation="default" cancelable>
        <div className="alert-dialog-title">Warning!</div>
          <div className="alert-dialog-content">
          An error has occurred!
          </div>
        <div className="alert-dialog-footer">
        <button onClick={this.close} className="alert-dialog-button">OK</button>
        </div>
      </Ons.AlertDialog>
    </Ons.Page>
    );
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
