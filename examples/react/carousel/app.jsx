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
      <ons-toolbar>
         <div className="left"><ons-back-button>Back</ons-back-button></div>
         <div className="center">Fullscreen</div>
      </ons-toolbar>

      <ons-carousel ref="carousel" swipeable overscrollable auto-scroll fullscreen auto-scroll-ratio="0.2" var="carousel">
      <ons-carousel-item style={{backgroundColor: 'gray'}}>
        <div className="item-label">GRAY</div>
      </ons-carousel-item>
      <ons-carousel-item style={{backgroundColor: '#085078'}}>
        <div className="item-label">BLUE</div>
      </ons-carousel-item>
      <ons-carousel-item style={{backgroundColor: '#373B44'}}>
        <div className="item-label">DARK</div>
      </ons-carousel-item>
      <ons-carousel-item style={{backgroundColor: '#D38312'}}>
        <div className="item-label">ORANGE</div>
      </ons-carousel-item>
      <ons-carousel-cover><div className="cover-label">ons-carousel-cover</div></ons-carousel-cover>
    </ons-carousel>

    <ons-bottom-toolbar>
      <ons-toolbar-button style={{float: 'right'}} onClick={this.moveRight}>Next</ons-toolbar-button>
      <ons-toolbar-button style={{float: 'left'}} onClick={this.moveLeft}>Prev</ons-toolbar-button>
    </ons-bottom-toolbar>
  </OnsPage>
    );
  }
});


var MyPage  = React.createClass({
  showPage1: function() {
    this.refs.navi.pushComponent(
      <MyPage2 />
      );
  },
  render: function() {
    return (
    <OnsNavigator ref="navi">
      <OnsPage>
        <ons-toolbar>
          <div className="center">Carousel</div>
        </ons-toolbar>
        <br />
        <ons-list>
                <ons-list-item onClick={this.showPage1} modifier="chevron">Example1</ons-list-item>
                {/* <ons-list-item ng-click="navi.pushPage('example2.html')" modifier="chevron">Example2</ons-list-item> */}
                {/* <ons-list-item ng-click="navi.pushPage('example3.html')" modifier="chevron">Example3</ons-list-item> */}
                {/* <ons-list-item ng-click="navi.pushPage('example4.html')" modifier="chevron">Example4</ons-list-item> */}
                {/* <ons-list-item ng-click="navi.pushPage('example5.html')" modifier="chevron">Example5</ons-list-item> */}
                {/* <ons-list-item ng-click="navi.pushPage('example6.html')" modifier="chevron">Example6</ons-list-item> */}
                {/* <ons-list-item ng-click="navi.pushPage('example7.html')" modifier="chevron">Example7</ons-list-item> */}
                {/* <ons-list-item ng-click="navi.pushPage('example8.html')" modifier="chevron">Example8</ons-list-item> */}
              </ons-list>
            </OnsPage>
          </OnsNavigator>
    );
  }
});

ReactDOM.render(<MyPage />, document.getElementById('app'));
