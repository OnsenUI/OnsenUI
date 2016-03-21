var MyPage = React.createClass({
  render: function() {
    var popButton;
    var replaceButton;
    var resetButton;
    var insertFrontButton;
    var insertBackButton;

    if (this.props.popPage) { 
      popButton = <ons-button id={'pop_' + this.props.id} 
        style={{marginRight: 10}} onClick={this.props.popPage}> Pop </ons-button>
    } 

    if (this.props.replacePage) {
      replaceButton = <ons-button id={'replace_' + this.props.id} style={{marginLeft: 10}} onClick={this.props.replacePage}> Replace </ons-button>;
    }

    if (this.props.resetPage) {
      resetButton = <ons-button id={'reset_' + this.props.id} style={{marginLeft: 10}} onClick={this.props.resetPage}> Reset Page </ons-button>;
    }

    if (this.props.insertPageFront) {
      insertFrontButton = <ons-button id={'insert_front_' + this.props.id} style={{marginLeft: 10}} onClick={this.props.insertPageFront}>  Insert Background (front) </ons-button>;
    }

    if (this.props.insertPageBack) {
      insertBackButton  = <ons-button id={'insert_back_' + this.props.id} style={{marginLeft: 10}} onClick={this.props.insertPageBack}>  Insert Background (Back)</ons-button>;
    }

    return <OnsPage id={this.props.id}>
      <ons-toolbar>
        <div className="center" id={'title_' + this.props.id}> {this.props.title} </div>
      </ons-toolbar>
      <div style={{display: 'flex'}}> 
        <div style={{flex: 1}} ></div>
        {popButton}
        <ons-button 
          id={'push_' + this.props.id} 
          onClick={this.props.pushPage}> 
          Push 
        </ons-button>
        {replaceButton}
        {resetButton}
        <div style={{flex: 1}} ></div>
      </div>
      <div style={{display: 'flex', marginTop: 10}}> 
        <div style={{flex: 1}} ></div>
        {insertFrontButton}
        {insertBackButton}
        <div style={{flex: 1}} ></div>
      </div>
    </OnsPage>
  }
});

var MyNav  = React.createClass({
  getInitialState: function() {
    return {};
  },
  popPage: function() {
    this.counter--;
    this.refs.navi.popPage({animation: 'none'});
  },
  replacePage: function() {
    console.log('replace page');
    var id='page_' + this.counter;
    this.refs.navi.replacePage(
      <MyPage title="Replaced Page" id={id} popPage={this.popPage} pushPage={this.pushPage} />, {animation: 'none'}
    );
  },
  resetPage: function() {
    this.counter = 1;
    var id='page_' + this.counter;
    this.refs.navi.resetToPage(
      <MyPage title="Reset Page" id={id} pushPage={this.pushPage}  />
    );
  },
  pushPage: function() {
    this.counter++;
    var navTitle = "Navigator "+ this.counter;
    var id='page_' + this.counter;
    this.refs.navi.pushComponent(
      <MyPage title={navTitle}
      id={id} resetPage={this.resetPage} 
      replacePage={this.replacePage} 
      insertPageFront={this.insertPage.bind(this, -1)}
      insertPageBack={this.insertPage.bind(this,0)}
      popPage={this.popPage} 
      pushPage={this.pushPage} />, 
      {animation: 'none'}
    );
  },
  insertPage: function(pos) {
    this.counter++;
    var title = 'Navigator ' +  this.counter;
    var id='page_' + this.counter;
    this.refs.navi.insertComponent(
      <MyPage title={title}
        id={id}
        popPage={this.popPage}
        insertPageFront={this.insertPage.bind(this, -1)}
        insertPageBack={this.insertPage.bind(this, 0)}
      />, pos, {animation: 'none'}
    );
  },

  componentDidMount: function() {
    this.counter = 1;
  },
  
  render: function() {
    return <OnsNavigator id="mynav" ref="navi">
      <MyPage 
       insertPageFront={this.insertPage.bind(this, -1)}
       insertPageBack={this.insertPage.bind(this, 0)}
       title="Navigator 1" 
       id="page_1" 
       popPage={this.popPage}
       resetPage={this.resetPage} 
       pushPage={this.pushPage} />
    </OnsNavigator>
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
