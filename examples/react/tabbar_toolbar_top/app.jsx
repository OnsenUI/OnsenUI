var MyPage = React.createClass({
  render: function() {
    return (
      <Ons.Page {...this.props}>
        <div style={{textAlign: 'center'}}>
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
              <p>5</p>
              <br />
              <br />
              <br />
              <p>last</p>
        </div>
      </Ons.Page>
    );
  },
});

var MyNav  = React.createClass({
  getInitialState: function() {
    return {};
  },

  
  render: function() {
    return (
      <Ons.Page>
        <Ons.Toolbar>
          <div className="center">Title</div>
        </Ons.Toolbar>
      <Ons.Tabbar
          initialIndex={1}
          renderTabs={() => [
            {
              content: <MyPage />,
              tab: <Ons.Tab icon="ion-home" />
            },
            {
              content: <MyPage />,
              tab: <Ons.Tab icon="ion-chatbox-working" />
            },
            {
              content: <MyPage />,
              tab: <Ons.Tab icon="ion-ios-cog" />
            }
          ]} />
      </Ons.Page>
    );
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
