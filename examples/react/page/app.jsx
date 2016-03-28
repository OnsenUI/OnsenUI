var MyPage  = React.createClass({
  render: function() {
    return <Ons.Page>
      <div style={{textAlign: 'center'}}>
        <h1>Page Content</h1>
      </div>
    </Ons.Page>
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
