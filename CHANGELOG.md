
CHANGELOG
====

v1.1.4
----

 * core: Fixed broken navigation-bar layout on runninng with iOS Cordova in some cases.
 * css-components: Fixed [#217](https://github.com/OnsenUI/OnsenUI/issues/217).

v1.1.3
----

 * Added task automation with gulp.js in project templates.
 * core: Added ons.disableAutoStatusBarFill() and ons.enableAutoStatusBarFill().
 * core: Changed to write warning message on loading if angular.element is not JQLite.
 * core: Added ons.orientation for dealing with device orientation.
 * navigator: Fixed [#208](https://github.com/OnsenUI/OnsenUI/issues/208).
 * ons-switch: Implemented [#199](https://github.com/OnsenUI/OnsenUI/issues/199). Changed switch component 'change' event to have 'isInteractive' property.
 * ons-tabbar: Renamed 'ons-tabbar-item' to 'ons-tab'.
 * ons-tabbar: Changed 'ons-tab' to accept child html contents.
 * ons-tabbar: Added 'ons-tab-active' and 'ons-tab-inactive' attributes on child elements of 'ons-tab'.
 * ons-tabbar: Added 'position' attribute on 'ons-tabbar' to put tabbar on screen top or screen bottom.
 * ons-tabbar: Added 'ons-tab-active', 'ons-tab-inactive' attribute on 'ons-tab'.
 * css-components: Rewritten all patterns completely with Onsen UI.

v1.1.2
----

 * Added 'ons-template' directive.
 * Added 'ons-gesture-detector' directive.
 * Added 'ons-template' directive.
 * core: Removed several memory leak possibilities.
 * core: Added minified scripts.
 * core: Changes ons.bootstrap() to accept dependency module names, e.g. `ons.bootstrap(['ngAnimate'])`.
 * core: Added ons.findComponent(), ons.findParenComponentUntil() methods to retrieve components.
 * core: Added ons.setDefaultDeviceBackButtonListener(), ons.disableDeviceBackButtonHandler(), ons.enableDeviceBackButtonHandler() methods.
 * css-components: Updated border styles on some components for retina display.
 * css-components: Added 'button--outline' component.
 * css-components: Renamed 'icon-button' component to 'toolbar-button'.
 * css-components: Added 'toolbar-button--outline' component.
 * ons-navigator: Fixed [#165](https://github.com/OnsenUI/OnsenUI/issues/165).
 * ons-navigator: Added navigator.getDeviceBackButtonHandler().
 * ons-tabbar: Added 'animation' attribute.
 * ons-page: Added page.getDeviceBackButtonHandler(), page.setDeviceBackButtonHandler().
 * ons-modal: Added modal.getDeviceBackButtonHandler().
 * ons-modal: Fixed [#182](https://github.com/OnsenUI/OnsenUI/issues/182).
 * ons-sliding-menu: Added slidingMenu.getDeviceBackButtonHandler().
 * ons-icon: Added [ionicons](http://ionicons.com).
 * ons-scroller: Fixed [#184](https://github.com/OnsenUI/OnsenUI/issues/184).
 * ons-switch: Fixed [#185](https://github.com/OnsenUI/OnsenUI/issues/185).
 * ons-tabbar: Added tabbar.loadPage(), tabbar.getActiveTabIndex().
 * ons-tabbar: Changed tab-change behaivior to be cancelable with event.cancel() method on 'prechange' events.
 * ons-tabbar: Added 'animation' attribute and TabbarView.registerAnimator() to use tabbar animation on loading.

