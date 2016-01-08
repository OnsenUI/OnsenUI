import ons from './ons/ons';
import util from './ons/util';
import GestureDetector from './ons/gesture-detector';
import deviceBackButtonDispatcher from './ons/device-back-button-dispatcher';
import platform from './ons/platform';
import notification from './ons/notification';
import internal from './ons/internal';
import orientation from './ons/orientation';
import softwareKeyboard from './ons/software-keyboard';
import PageAttributeExpression from './ons/page-attribute-expression';
import BaseElement from './ons/base-element';
import animationOptionsParser from './ons/animation-options-parser';
import DoorLock from './ons/doorlock';

ons._util = util;
ons._deviceBackButtonDispatcher = deviceBackButtonDispatcher;
ons._internal = internal;
ons.GestureDetector = GestureDetector;
ons.platform = platform;
ons.softwareKeyboard = softwareKeyboard;
ons.pageAttributeExpression = PageAttributeExpression;
ons.orientation = orientation;
ons.notification = notification;
ons._animationOptionsParser = animationOptionsParser;
ons._DoorLock = DoorLock;

window.addEventListener('DOMContentLoaded', function() {
  ons._deviceBackButtonDispatcher.enable();
});

import './elements/ons-alert-dialog';
import './elements/ons-back-button';
import './elements/ons-bottom-toolbar';
import './elements/ons-button';
import './elements/ons-carousel-item';
import './elements/ons-carousel';
import './elements/ons-col';
import './elements/ons-dialog';
import './elements/ons-fab';
import './elements/ons-gesture-detector';
import './elements/ons-icon';
import './elements/ons-lazy-repeat';
import './elements/ons-list-header';
import './elements/ons-list-item';
import './elements/ons-list';
import './elements/ons-material-input';
import './elements/ons-modal';
import './elements/ons-navigator';
import './elements/ons-page';
import './elements/ons-popover';
import './elements/ons-progress-bar';
import './elements/ons-progress-circular';
import './elements/ons-pull-hook';
import './elements/ons-ripple';
import './elements/ons-row';
import './elements/ons-scroller';
import './elements/ons-speed-dial-item';
import './elements/ons-speed-dial';
import './elements/ons-splitter-content';
import './elements/ons-splitter-mask';
import './elements/ons-splitter-side';
import './elements/ons-splitter';
import './elements/ons-switch';
import './elements/ons-tab';
import './elements/ons-tabbar';
import './elements/ons-template';
import './elements/ons-toolbar-button';
import './elements/ons-toolbar';

// fastclick
window.addEventListener('load', () => FastClick.attach(document.body), false);

// ons._defaultDeviceBackButtonHandler
window.addEventListener('DOMContentLoaded', () => {
  ons._defaultDeviceBackButtonHandler = deviceBackButtonDispatcher.createHandler(window.document.body, () => {
    navigator.app.exitApp();
  });
}, false);

// setup loading placeholder
ons.ready(function() {
  ons._setupLoadingPlaceHolders();
});

// viewport.js
new Viewport().setup();

// modernize
Modernizr.testStyles('#modernizr { -webkit-overflow-scrolling:touch }', function(elem, rule) {
  Modernizr.addTest(
    'overflowtouch',
    window.getComputedStyle && window.getComputedStyle(elem).getPropertyValue('-webkit-overflow-scrolling') == 'touch');
});

export default ons;
