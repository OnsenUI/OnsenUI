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
        <ons-toolbar>
          <div className="center">Modal</div>
        </ons-toolbar>

        <ons-modal ref="modal">
          <ons-icon icon="gear" spin="true" style={{lineHeight : 20, verticalAlign: 'middle'}}></ons-icon>
          <span style={{lineHeight: 20, fontSize: 15}}>Loading...</span>
        </ons-modal>
        <p style={{textAlign: 'center'}}>
          <ons-button onClick={this.props.popPage}>Pop Page</ons-button>
        </p>
        <p style={{textAlign: 'center'}}>
          <ons-button modifier="light" onClick={this.openModal}>Open Modal</ons-button>
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
    this.refs.nav.pushComponent(<Page2 popPage={this.popPage}/>);
  },
  render: function() {
    return (

      <OnsNavigator ref="nav">
        <OnsPage>
        <ons-modal ref="modal">
          <ons-icon icon="gear" spin="true" style={{lineHeight : 20, verticalAlign: 'middle'}}></ons-icon>
          <span style={{lineHeight: 20, fontSize: 15}}>Loading...</span>
        </ons-modal>

        <ons-toolbar>
          <div className="center">Modal</div>
        </ons-toolbar>

        <p style={{textAlign: 'center'}}>
          <ons-button onClick={this.push}> Push Page </ons-button>
        </p>
        <p style={{textAlign: 'center'}}>
          <ons-button modifier="light" onClick={this.openModal}>Open Modal</ons-button>
        </p>
      </OnsPage>
    </OnsNavigator>
  );
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
