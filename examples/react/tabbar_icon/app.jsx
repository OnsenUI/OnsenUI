var MyPage = React.createClass({
  render: function() {
    return (
      <Ons.Page {...this.props}>
         <Ons.Toolbar>
           <div className="center">{this.props.title}</div>
         </Ons.Toolbar>
         <div>{this.props.content}</div>
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
    <div>
      <Ons.Tabbar
        initialIndex={1}
        renderTabs={() => [
          {
            content: <MyPage title="Home" content="Home content" />,
            tab: <Ons.Tab icon="ion-home" />
          },
          {
            content: <MyPage title="Comments" content="Comments content" />,
            tab: <Ons.Tab icon="ion-chatbox-working" />
          },
          {
            content: <MyPage title="Settings" content="Settings content" />,
            tab: <Ons.Tab icon="ion-ios-cog" />
          }
        ]} />
  </div>);
  }
});

ReactDOM.render(<MyNav />, document.getElementById('app'));
