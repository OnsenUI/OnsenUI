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
        <ons-toolbar>
          <div className="center"> {this.props.title} </div>
        </ons-toolbar>
        <div> {this.props.content} </div>

        <label>Name:
          <input value={this.state.value} onChange={this.handleChange} />
        </label>
        <p>Hello, {this.state.value}!</p>
      </OnsPage>
    );
  },
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
        renderTabs={(tabbar) =>
          [
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
                </OnsPage>,
              tab: <OnsTab label={this.state.label} />
            }
          ]
        }>
      </OnsTabbar>
    );
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
