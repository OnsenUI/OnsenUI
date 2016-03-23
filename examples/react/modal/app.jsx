var Page2 = React.createClass({
  openModal: function() {
    this.refs.modal.show();

    setTimeout(function() {
      this.refs.modal.hide();
    }.bind(this), 500);
  },
  render: function() {
    return (
      <Ons.Page>
        <Ons.Toolbar>
          <div className="center">Modal</div>
        </Ons.Toolbar>

        <ons-modal ref="modal">
          <Ons.Icon icon="gear" spin="true" style={{lineHeight : 20, verticalAlign: 'middle'}}></Ons.Icon>
          <span style={{lineHeight: 20, fontSize: 15}}>Loading...</span>
        </ons-modal>
        <p style={{textAlign: 'center'}}>
          <Ons.Button onClick={this.props.popPage}>Pop Page</Ons.Button>
        </p>
        <p style={{textAlign: 'center'}}>
          <Ons.Button modifier="light" onClick={this.openModal}>Open Modal</Ons.Button>
        </p>
      </Ons.Page>
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
    return (<Ons.Page>
        <ons-modal ref="modal">
          <Ons.Icon icon="gear" spin="true" style={{lineHeight: 20, verticalAlign: 'middle'}} />
          <span style={{lineHeight: 20, fontSize: 15}}>Loading...</span>
        </ons-modal>

        <Ons.Toolbar>
          <div className="center">Modal</div>
        </Ons.Toolbar>

        <p style={{textAlign: 'center'}}>
          <Ons.Button onClick={this.props.push}> Push Page </Ons.Button>
        </p>
        <p style={{textAlign: 'center'}}>
          <Ons.Button modifier="light" onClick={this.openModal}>Open Modal</Ons.Button>
        </p>
      </Ons.Page>);
  }
});

var MyPage  = React.createClass({

  popPage: function() {
    this.refs.nav.popPage();
  },
  renderScene: function(route, navigator) {
    return React.createElement(route.comp, route.props);
  },
  push: function() {
    this.refs.nav.pushPage({comp: Page2, props: {popPage: this.popPage}});
  },
  render: function() {
    return (

      <Ons.Navigator ref="nav"
       initialRoute={{comp: FirstPage, props: {push: this.push} }}
       renderScene={this.renderScene} />
  );
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
