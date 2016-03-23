import React from 'react';

var createSimpleWrapperClass = function(domName) {
  var myClass = {
    render: function() {
      return React.createElement(domName, this.props, this.props.children);
    }
  };
  return React.createClass(myClass);
};

var Button = createSimpleWrapperClass('ons-button');
var Toolbar = createSimpleWrapperClass('ons-toolbar');
var BackButton = createSimpleWrapperClass('ons-back-button');
var Ripple = createSimpleWrapperClass('ons-ripple');
var Carousel = createSimpleWrapperClass('ons-carousel');
var CarouselItem = createSimpleWrapperClass('ons-carousel-item');
var CarouselCover = createSimpleWrapperClass('ons-carousel-cover');
var ToolbarButton = createSimpleWrapperClass('ons-toolbar-button');
var BottomToolbar = createSimpleWrapperClass('ons-buttom-toolbar');
var ListItem = createSimpleWrapperClass('ons-list-item');
var Icon = createSimpleWrapperClass('ons-icon');
var Scroller = createSimpleWrapperClass('ons-scroller');
var TabActive = createSimpleWrapperClass('ons-tab-active');
var TabInactive = createSimpleWrapperClass('ons-tab-inactive');

export {
  Button,
  Toolbar,
  BackButton,
  Ripple,
  Carousel,
  CarouselItem,
  CarouselCover,
  ToolbarButton,
  BottomToolbar,
  ListItem,
  Icon,
  Scroller,
  TabActive,
  TabInactive
};
