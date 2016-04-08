import ons from './ons/ons';

import './elements/ons-template';
import './elements/ons-if';
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
import './elements/ons-input';
import './elements/ons-modal';
import './elements/ons-navigator';
import './elements/ons-page';
import './elements/ons-popover';
import './elements/ons-progress-bar';
import './elements/ons-progress-circular';
import './elements/ons-pull-hook';
import './elements/ons-ripple';
import './elements/ons-row';
import './elements/ons-speed-dial-item';
import './elements/ons-speed-dial';
import './elements/ons-splitter-content';
import './elements/ons-splitter-mask';
import './elements/ons-splitter-side';
import './elements/ons-splitter';
import './elements/ons-switch';
import './elements/ons-tab';
import './elements/ons-tabbar';
import './elements/ons-toolbar-button';
import './elements/ons-toolbar';
import './elements/ons-range';

// fastclick
window.addEventListener('load', () => {
    ons.fastClick = FastClick.attach(document.body);
}, false);

// ons._defaultDeviceBackButtonHandler
window.addEventListener('DOMContentLoaded', () => {
  ons._deviceBackButtonDispatcher.enable();
  ons._defaultDeviceBackButtonHandler = ons._deviceBackButtonDispatcher.createHandler(window.document.body, () => {
    navigator.app.exitApp();
  });
  document.body._gestureDetector = new ons.GestureDetector(document.body);
}, false);

// setup loading placeholder
ons.ready(function() {
  ons._setupLoadingPlaceHolders();
});

// viewport.js
new Viewport().setup();

export default ons;
