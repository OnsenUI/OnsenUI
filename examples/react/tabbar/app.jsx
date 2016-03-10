var MyPage = React.createClass({
  getInitialState: function() {
    return {
      value: 'Andreas'
    };
  },

  handleChange: function(e) {
    this.setState({
      value: e.target.value
    });
  },

  render: function() {
    return (
      <OnsPage {...this.props}>
        <OnsToolbar>
          <div className="center"> {this.props.title} </div>
        </OnsToolbar>

        <div> {this.props.content} </div>

        <label>Name:
          <input value={this.state.value} onChange={this.handleChange} />
        </label>
        <p>Hello, {this.state.value}!</p>
      </OnsPage>
    );
  },
});

var LoadStuff = React.createClass({
  getInitialState: function() {
    return {
      loaded: false
    }
  },

  componentDidMount: function() {
    this.timeout = setTimeout(() => {
      this.setState({loaded: true});
    }, 1000);
  },

  componentWillUnmount: function() {
    clearTimeout(this.timeout);
  },

  render: function() {
    if (this.state.loaded) {
      return <p>Finished!</p>
    }
    else {
      return <p>Loading...</p>
    }
  }
});

var MyNav  = React.createClass({
  getInitialState: function() {
    return {
      label: 0
    };
  },

  componentDidMount: function() {
    setInterval(() => {
      this.setState({label: this.state.label + 1});
    }, 400);
  },

  render: function() {
    return (
      <OnsTabbar
        initialIndex={2}
        animation="fade"
        renderTabs={(activeIndex, tabbar) => {
          return [
            {
              content: <MyPage title="Home" content="Home content" />,
              tab: <OnsTab label="Home" />
            },
            {
              content: <MyPage title="Comments" content="Comment content" />,
              tab: <OnsTab label="Comments" />
            },
            {
              content:
                <OnsPage>
                  <ons-toolbar><div className="center">{this.state.label}</div></ons-toolbar>
                  <ons-button onClick={tabbar.setActiveTab.bind(null, 0)}>Go home</ons-button>
                  {activeIndex === 2 ? <LoadStuff /> : null}
                </OnsPage>,
              tab: <OnsTab label={this.state.label} />
            }
          ]
          }
        }>
      </OnsTabbar>
    );
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
