

var NavPage = React.createClass({
  render: function() {
    return (
      <OnsPage {...this.props}>
        <ons-toolbar>
          <div className="center"> {this.props.title} </div>
        </ons-toolbar>
        <div style={{textAlign: 'center'}}>
          <br />
          <ons-button onClick={this.props.popPage}> Pop me </ons-button>
        </div>
      </OnsPage>
    );
  },
});



var Nav = React.createClass({
  popPage: function() {
    this.refs.nav.popPage();
  },
  pushPage: function() {
    console.log('push page');
    this.refs.nav.pushPage(<NavPage title="Page 2" popPage={this.popPage} />);
  },
  render: function() {
    return (
      <OnsPage>
      <OnsNavigator ref="nav">
        <OnsPage {...this.props}>
           <ons-toolbar>
             <div className="center"> {this.props.title} </div>
           </ons-toolbar>
           <div style={{textAlign: 'center'}}>
             <br />
             <ons-button onClick={this.pushPage}> Push me </ons-button>
           </div>
        </OnsPage>
      </OnsNavigator>
    </OnsPage>
    );
  },
});

var MyPage = React.createClass({
  render: function() {
    return (
      <OnsPage {...this.props}>
          <ons-toolbar>
            <div className="center"> {this.props.title} </div>
          </ons-toolbar>
          <div> {this.props.content} </div>
        </OnsPage>
    );
  },
});

var MyNav  = React.createClass({
  getInitialState: function() {
    return {};
  },

  
  render: function() {
    return (
    <div> 
      <OnsTabbar
        pages= {[
          <Nav title="Page 1" />,
          <MyPage title="Settings "  content="Settings content" />,
          <MyPage title="Favorite "  content="Favorite content" />
        ]}
        >

        <OnsTab 
          icon="home"
          label="Page1"
          active="true" />
      <OnsTab
        icon="gear"
        label="Settings" />
      <OnsTab
        icon="star"
        label="Favorite" />
    </OnsTabbar>
    </div>);
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
