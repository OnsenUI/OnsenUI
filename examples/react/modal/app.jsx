var Page2 = React.createClass({
  openModal: function() {
    this.refs.modal.show();

    setTimeout(function() {
      this.refs.modal.hide();
    }.bind(this), 500);
  },
  render: function() {
    return (
      <OnsPage>
        <OnsToolbar>
          <div className="center">Modal</div>
        </OnsToolbar>

        <ons-modal ref="modal">
          <OnsIcon icon="gear" spin="true" style={{lineHeight : 20, verticalAlign: 'middle'}}></OnsIcon>
          <span style={{lineHeight: 20, fontSize: 15}}>Loading...</span>
        </ons-modal>
        <p style={{textAlign: 'center'}}>
          <OnsButton onClick={this.props.popPage}>Pop Page</OnsButton>
        </p>
        <p style={{textAlign: 'center'}}>
          <OnsButton modifier="light" onClick={this.openModal}>Open Modal</OnsButton>
        </p>
      </OnsPage>
    );
  }


});

var MyPage  = React.createClass({

  openModal: function() {
    console.log('open modal');
    this.refs.modal.show();

    setTimeout(function() {
      this.refs.modal.hide();
    }.bind(this), 500);

  },
  popPage: function() {
    this.refs.nav.popPage();
  },
  push: function() {
    this.refs.nav.pushPage(<Page2 popPage={this.popPage}/>);
  },
  render: function() {
    return (

      <OnsNavigator ref="nav">
        <OnsPage>
        <ons-modal ref="modal">
          <OnsIcon icon="gear" spin="true" style={{lineHeight : 20, verticalAlign: 'middle'}} />
          <span style={{lineHeight: 20, fontSize: 15}}>Loading...</span>
        </ons-modal>

        <OnsToolbar>
          <div className="center">Modal</div>
        </OnsToolbar>

        <p style={{textAlign: 'center'}}>
          <OnsButton onClick={this.push}> Push Page </OnsButton>
        </p>
        <p style={{textAlign: 'center'}}>
          <OnsButton modifier="light" onClick={this.openModal}>Open Modal</OnsButton>
        </p>
      </OnsPage>
    </OnsNavigator>
  );
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
