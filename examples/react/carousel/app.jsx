var MyPage2  = React.createClass({
  moveRight: function() {
    this.refs.carousel.next();
  },
  moveLeft: function() {
    this.refs.carousel.prev();
  },
  render: function() {
    return (
      <OnsPage>
        <OnsToolbar>
           <div className="left"><ons-back-button>Back</ons-back-button></div>
           <div className="center">Fullscreen</div>
        </OnsToolbar>

        <OnsCarousel ref="carousel" swipeable overscrollable auto-scroll fullscreen auto-scroll-ratio="0.2" var="carousel">
        <OnsCarouselItem style={{backgroundColor: 'gray'}}>
          <div className="item-label">GRAY</div>
        </OnsCarouselItem>
        <OnsCarouselItem style={{backgroundColor: '#085078'}}>
          <div className="item-label">BLUE</div>
        </OnsCarouselItem>
        <OnsCarouselItem style={{backgroundColor: '#373B44'}}>
          <div className="item-label">DARK</div>
        </OnsCarouselItem>
        <OnsCarouselItem style={{backgroundColor: '#D38312'}}>
          <div className="item-label">ORANGE</div>
        </OnsCarouselItem>
        <OnsCarouselCover><div className="cover-label">OnsCarouselCover</div></OnsCarouselCover>
      </OnsCarousel>

      <OnsBottomToolbar>
        <OnsToolbarButton style={{float: 'right'}} onClick={this.moveRight}>Next</OnsToolbarButton>
        <OnsToolbarButton style={{float: 'left'}} onClick={this.moveLeft}>Prev</OnsToolbarButton>
      </OnsBottomToolbar>
    </OnsPage>
  );
  }
});

var FirstPage = React.createClass({
 getInitialState: function() {
    return { };
  },
  render: function() {
    return (
      <OnsPage>
        <OnsToolbar>
          <div className="center">Carousel</div>
        </OnsToolbar>
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
            </OnsPage>
    );
  }
});


var MyPage  = React.createClass({
  showPage1: function() {
    this.refs.navi.pushPage({comp: MyPage2});
  },

  renderScene: function(navigator, route) {
    return React.createElement(route.comp, route.props);
  },

  render: function() {
    return (
      <OnsNavigator ref="navi"
        initialRoute={{comp: FirstPage, props: {showPage1: this.showPage1}}}
        renderScene={this.renderScene}
        >
      </OnsNavigator>
    );
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
