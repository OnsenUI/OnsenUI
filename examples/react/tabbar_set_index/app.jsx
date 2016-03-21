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
          <OnsToolbar>
            <div className="center"> {this.props.title} </div>
          </OnsToolbar>
          <div style={{textAlign: 'center'}}>
            <br />
            <div>
            { [0,1,2].map(function(num) { 
              return <OnsButton 
                onClick={this.goTo.bind(this, num)} 
                style={{marginRight:10}}>
                Go {num}
              </OnsButton>
              }.bind(this))
            }
          </div>
            <br />
            <OnsButton onClick={this.askIndex}> Ask for Index </OnsButton>
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
        <OnsTabActive>
          HOME
        </OnsTabActive>
        <OnsTabInactive>
          home
        </OnsTabInactive>
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
