var MyPage  = React.createClass({
  renderRow: function(index) {
    return <OnsListItem key={index}>
      {'Item ' + (index + 1)}
    </OnsListItem>;
  },
  render: function() {
    return <OnsPage>
    <ons-toolbar>
      <div className="center">Lazy Repeat</div>
    </ons-toolbar>

    <div style={{height: 100}}>
      <OnsLazyList
        length={1000}
        renderRow={this.renderRow}
        calculateItemHeight={() => 44}
      />
    </div>

    </OnsPage>
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
