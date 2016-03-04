var OnsLazyRepeat = React.createClass({
  componentDidMount: function() {
    this.refs.lazyRepeat.firstChild.delegate = {
      calculateItemHeight: function(index) {
        return 44;
      },
      createElement: function({index: index, top: top}) {
        return (
          <OnsListItem
            style={{position: 'absolute', top: top, left: 0, right: 0}}>
              {index}
          </OnsListItem>
        );
      },
      render: function(items, newHeight) {
        console.log('myrender');
        var createElement =  function({index: index, top: top}) {
        return (
          <OnsListItem key={index} class="list__item" _compiled style={{position: 'absolute', top: top, left: 0, right: 0}}>
            <div className="list__item__center">
              {index}
            </div>
          </OnsListItem>
        ) };

        var el = items.map(createElement);
        this.setState({children: el, height: newHeight});
      }.bind(this),
      countItems: function() {
        // Return number of items.
        return 10000000;
      },
      destroyItem: function(index, item) {
        // Optional method that is called when an item is unloaded.
        console.log('Destroyed item with index: ' + index);
      }
    };
  },
  getInitialState: function() {
    return {
      children: [],
      height: 0,
    };
  },
  render: function() {
    return (
      <OnsList ref="lazyRepeat" class="list" style={{position: 'relative', height: this.state.height}}>
      <ons-lazy-repeat >
      </ons-lazy-repeat>
      {this.state.children}
  </OnsList>
    );
  }
});


var MyPage  = React.createClass({
  componentDidMount: function() {

  },
  render: function() {
    return <OnsPage>
    <ons-toolbar>
      <div className="center">Lazy Repeat</div>
    </ons-toolbar>

      <OnsLazyRepeat />

    </OnsPage>
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
