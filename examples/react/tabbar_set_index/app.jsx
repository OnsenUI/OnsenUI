var MyPage = React.createClass({

  getInitialState: function() {
    return {
      indexText: '',
    };
  },

  askIndex: function(num) {
    this.setState({indexText: 'Our current index is ' + this.props.getIndex()});
  },

  goTo: function(num) {
    this.props.goTo(num);
  },
  render: function() {
    return (
      <OnsPage {...this.props}>
          <ons-toolbar>
            <div className="center"> {this.props.title} </div>
          </ons-toolbar>
          <div style={{textAlign: 'center'}}>
            <br />
            <div>
            { [0,1,2].map(function(num) { 
              return <ons-button 
                onClick={this.goTo.bind(this, num)} 
                style={{marginRight:10}}>
                Go {num}
              </ons-button>
              }.bind(this))
            }
          </div>
            <br />
            <ons-button onClick={this.askIndex}> Ask for Index </ons-button>
            <div style={{marginTop: 10}}> {this.state.indexText} </div>
        </div>
        </OnsPage>
    );
  },
});

var MyNav  = React.createClass({
  getInitialState: function() {
    return {};
  },

  goTo: function(index) {
    this.refs.myTabbar.setActiveTab(index);
  },

  getIndex: function() {
    return this.refs.myTabbar.getActiveTabIndex();
  },

  render: function() {
    return (
    <div> 
      <OnsTabbar ref='myTabbar'
        pages= {[
          <MyPage getIndex={this.getIndex} goTo={this.goTo} title="Home"  content="Home content" />,
          <MyPage  getIndex={this.getIndex} goTo={this.goTo} title="Comments"  content="Comment content" />,
          <MyPage  getIndex={this.getIndex} goTo={this.goTo} title="Settings"  content="Setting content" />
        ]}
        >
      <OnsTab active="true">
        <ons-tab-active>
          HOME
        </ons-tab-active>
        <ons-tab-inactive>
          home
        </ons-tab-inactive>
      </OnsTab>
      <OnsTab
        icon="ion-chatbox-working"
        label="Comments" />
      <OnsTab
        icon="ion-ios-cog"
        label="Settings" />
    </OnsTabbar>
    </div>);
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
