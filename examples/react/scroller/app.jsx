var MyPage  = React.createClass({
  render: function() {
    return (
      <OnsPage>
    <OnsToolbar>
      <div className="center">Scroller</div>
    </OnsToolbar>
    <OnsScroller style={{height: 200, backgroundColor: 'white'}}>
      <div style={{textAlign: 'center'}}>
        <h2>I am now scrollable!</h2>
        <h3>Happy scrolling!</h3>
        <h3>Happy scrolling!</h3>
        <h3>Happy scrolling!</h3>
        <h3>Happy scrolling!</h3>
        <h3>Happy scrolling!</h3>
        <h3>Happy scrolling!</h3>
        <h3>Happy scrolling!</h3>
        <h3>Happy scrolling!</h3>
        <h3>Happy scrolling!</h3>
        <h3>Happy scrolling!</h3>
        <h3>Happy scrolling!</h3>
        <h3>Happy scrolling!</h3>
        <h3>Happy scrolling!</h3>
        <h3>Happy scrolling!</h3>
        <h3>Happy scrolling!</h3>
        <h3>Happy scrolling!</h3>
        <h3>Happy scrolling!</h3>
        <h3>Happy scrolling!</h3>
        <h3>Happy scrolling!</h3>
        <h3>Happy scrolling!</h3>
        <h3>Happy scrolling!</h3>
        <h3>Happy scrolling!</h3>
        <h3>Happy scrolling!</h3>
        <h3>Happy scrolling!</h3>
        <h3>Happy scrolling!</h3>
      </div>
    </OnsScroller>
  </OnsPage>
  );

  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
