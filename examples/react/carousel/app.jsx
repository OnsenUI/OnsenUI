var MyPage2  = React.createClass({
  moveRight: function() {
    this.refs.carousel.next();
  },
  moveLeft: function() {
    this.refs.carousel.prev();
  },
  render: function() {
    return (
      <Ons.Page>
        <Ons.Toolbar>
           <div className="left"><ons-back-button>Back</ons-back-button></div>
           <div className="center">Fullscreen</div>
        </Ons.Toolbar>

        <Ons.Carousel ref="carousel" swipeable overscrollable auto-scroll fullscreen auto-scroll-ratio="0.2" var="carousel">
        <Ons.CarouselItem style={{backgroundColor: 'gray'}}>
          <div className="item-label">GRAY</div>
        </Ons.CarouselItem>
        <Ons.CarouselItem style={{backgroundColor: '#085078'}}>
          <div className="item-label">BLUE</div>
        </Ons.CarouselItem>
        <Ons.CarouselItem style={{backgroundColor: '#373B44'}}>
          <div className="item-label">DARK</div>
        </Ons.CarouselItem>
        <Ons.CarouselItem style={{backgroundColor: '#D38312'}}>
          <div className="item-label">ORANGE</div>
        </Ons.CarouselItem>
        <Ons.CarouselCover><div className="cover-label">Ons.CarouselCover</div></Ons.CarouselCover>
      </Ons.Carousel>

      <Ons.BottomToolbar>
        <Ons.ToolbarButton style={{float: 'right'}} onClick={this.moveRight}>Next</Ons.ToolbarButton>
        <Ons.ToolbarButton style={{float: 'left'}} onClick={this.moveLeft}>Prev</Ons.ToolbarButton>
      </Ons.BottomToolbar>
    </Ons.Page>
  );
  }
});

var FirstPage = React.createClass({
 getInitialState: function() {
    return { };
  },
  render: function() {
    return (
      <Ons.Page>
        <Ons.Toolbar>
          <div className="center">Carousel</div>
        </Ons.Toolbar>
        <br />
        <ons-list>
                <ons-list-item onClick={this.props.showPage1} modifier="chevron">Example1</ons-list-item>
                {/* <ons-list-item ng-click="navi.pushPage('example2.html')" modifier="chevron">Example2</ons-list-item> */}
                {/* <ons-list-item ng-click="navi.pushPage('example3.html')" modifier="chevron">Example3</ons-list-item> */}
                {/* <ons-list-item ng-click="navi.pushPage('example4.html')" modifier="chevron">Example4</ons-list-item> */}
                {/* <ons-list-item ng-click="navi.pushPage('example5.html')" modifier="chevron">Example5</ons-list-item> */}
                {/* <ons-list-item ng-click="navi.pushPage('example6.html')" modifier="chevron">Example6</ons-list-item> */}
                {/* <ons-list-item ng-click="navi.pushPage('example7.html')" modifier="chevron">Example7</ons-list-item> */}
                {/* <ons-list-item ng-click="navi.pushPage('example8.html')" modifier="chevron">Example8</ons-list-item> */}
              </ons-list>
            </Ons.Page>
    );
  }
});


var MyPage  = React.createClass({
  showPage1: function() {
    this.refs.navi.pushPage({comp: MyPage2});
  },

  renderScene: function(route, navigator) {
    return React.createElement(route.comp, route.props);
  },

  render: function() {
    return (
      <Ons.Navigator ref="navi"
        initialRoute={{comp: FirstPage, props: {showPage1: this.showPage1}}}
        renderScene={this.renderScene}
        >
      </Ons.Navigator>
    );
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
