var createSimpleWrapperClass = function(domName) {
  var myClass = {
    render: function() {
      return React.createElement(domName, this.props, this.props.children);
    }
  };
  return React.createClass(myClass);
};

var OnsButton = createSimpleWrapperClass('ons-button');
var OnsToolbar = createSimpleWrapperClass('ons-toolbar');
var OnsBackButton = createSimpleWrapperClass('ons-back-button');
var OnsRipple = createSimpleWrapperClass('ons-ripple');
var OnsCarousel = createSimpleWrapperClass('ons-carousel');
var OnsCarouselItem = createSimpleWrapperClass('ons-carousel-item');
var OnsCarouselCover = createSimpleWrapperClass('ons-carousel-cover');
var OnsToolbarButton = createSimpleWrapperClass('ons-toolbar-button');
var OnsBottomToolbar = createSimpleWrapperClass('ons-buttom-toolbar');
var OnsListItem = createSimpleWrapperClass('ons-list-item');
// var OnsList = createSimpleWrapperClass('ons-list');
var OnsIcon = createSimpleWrapperClass('ons-icon');
var OnsScroller = createSimpleWrapperClass('ons-scroller');
var OnsTabActive = createSimpleWrapperClass('ons-tab-active');
var OnsTabInactive = createSimpleWrapperClass('ons-tab-inactive');

