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

var FirstPage = React.createClass({
 getInitialState: function() {
    return { };
  },
  openModal: function() {
    console.log('open modal');
    this.refs.modal.show();

    setTimeout(function() {
      this.refs.modal.hide();
    }.bind(this), 500);

  },
  render: function() {
    return (<OnsPage>
        <ons-modal ref="modal">
          <OnsIcon icon="gear" spin="true" style={{lineHeight: 20, verticalAlign: 'middle'}} />
          <span style={{lineHeight: 20, fontSize: 15}}>Loading...</span>
        </ons-modal>

        <OnsToolbar>
          <div className="center">Modal</div>
        </OnsToolbar>

        <p style={{textAlign: 'center'}}>
          <OnsButton onClick={this.props.push}> Push Page </OnsButton>
        </p>
        <p style={{textAlign: 'center'}}>
          <OnsButton modifier="light" onClick={this.openModal}>Open Modal</OnsButton>
        </p>
      </OnsPage>);
  }
});

var MyPage  = React.createClass({

  popPage: function() {
    this.refs.nav.popPage();
  },
  renderScene: function(navigator, route) {
    return React.createElement(route.comp, route.props);
  },
  push: function() {
    this.refs.nav.pushPage({comp: Page2, props: {popPage: this.popPage}});
  },
  render: function() {
    return (

      <OnsNavigator ref="nav"
       initialRoute={{comp: FirstPage, props: {push: this.push} }}
       renderScene={this.renderScene} />
  );
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
