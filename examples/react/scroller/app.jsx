var MyPage  = React.createClass({
  render: function() {
    return (
    <OnsNavigator>
      <OnsPage>
    <ons-toolbar>
      <div class="center">Scroller</div>
    </ons-toolbar>
    <ons-scroller style={{height: 200, backgroundColor: 'white'}}>
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
    </ons-scroller>
  </OnsPage>
  </OnsNavigator>
  );

    
    
    
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
