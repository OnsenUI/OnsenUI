import React from 'react';

var createSimpleWrapperClass = function(domName) {
  var myClass = {
    render: function() {
      var {disabled, ...others} = this.props;

      if (disabled) {
        others.disabled = 'disabled';
      }

      return React.createElement(domName, others, this.props.children);
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
var ListHeader = createSimpleWrapperClass('ons-list-header');
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
  ListHeader,
  Icon,
  Scroller,
  TabActive,
  TabInactive
};
