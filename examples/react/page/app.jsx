var MyPage  = React.createClass({
  render: function() {
    return <OnsPage>
      <div style={{textAlign: 'center'}}>
        <h1>Page Content</h1>
      </div>
    </OnsPage>
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
