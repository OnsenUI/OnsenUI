var MyPage  = React.createClass({
  renderRow: function(index) {
    return <Ons.ListItem key={index}>
      {'Item ' + (index + 1)}
    </Ons.ListItem>;
  },
  render: function() {
    return <Ons.Page>
    <ons-toolbar>
      <div className="center">Lazy Repeat</div>
    </ons-toolbar>

    <div style={{height: 100}}>
      <Ons.LazyList
        length={1000}
        renderRow={this.renderRow}
        calculateItemHeight={() => 44}
      />
    </div>

    </Ons.Page>
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
