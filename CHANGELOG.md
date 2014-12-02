
CHANGELOG
====

v1.2.1
----

 * ons-switch: Fixed [#318](https://github.com/OnsenUI/OnsenUI/issues/318).
 * css-components: Fixed [#323](https://github.com/OnsenUI/OnsenUI/issues/323).
 * css-components: Fixed [#331](https://github.com/OnsenUI/OnsenUI/issues/331).
 * ons-split-view: Fixed issue where split view mode didn't update on Android.
 * ons-carousel: Fixed [#341](https://github.com/OnsenUI/OnsenUI/issues/341).
 * ons-split-view: Fixed [#340](https://github.com/OnsenUI/OnsenUI/issues/340). Now emits orientation change event every time the window is resized for desktop browsers.

v1.2.0
----

 * ons-screen: Removed.
 * Removed all deprecated methods and attributes on 'ons-split-view' and 'ons-sliding-menu'.
 * ons-page: Changed some internal markup structure and added '.page__background' elements for displaying page background.
 * core: Added 'init' events to components.
 * core: Fixed memory leak where events handlers were not removed when components were destroyed.
 * ons-icon: Implemented ons-icon attributes with css attribute selectors instead of javascript.
 * ons-toolbar: Added 'inline' attribute to toolbars.
 * core: Changed so 'ons.bootstrap()' returns an angular.module.
 * ons-sliding-menu: Changed so the main page and menu can be defined as child elements.
 * ons-sliding-menu: Animation can now be disabled when opening and closing menu.
 * ons-split-view: Changed so the main and secondary page can be defined as child elements.
 * ons-split-view: Added events and methods to control the default collapse behavior.
 * ons-split-view: The 'collapse' attribute can now be a media query.
 * ons-platform: Added ons.platform interface that can be used to query platform and OS.
 * ons-keyboard-active: Implemented component that only shows content when the software keyboard is active.
 * ons-loading-placeholder: Added component that shows a placeholder while loading a page.
 * ons-alert-dialog: Implemented 'alert-dialog' component. Also alert(), confirm() and prompt() methods.
 * ons-toolbar: Changed to have 'android' modifier automatically on android platform. And added 'fixed-style' attribute for preventing this behavior.
 * css-components: Added 'alert-dialog', 'dialog' and 'popover' components.
 * css-components: Changed default color scheme for css-components.
 * ons-dialog: Implemented 'dialog' component.
 * ons-popover: Implemented 'popover' component.
 * core: Updated to AngularJS version 1.3.0.
 * ons-carousel: Implemented 'carousel' component.
 * ons-tabbar: Added attribute 'no-reload' to tabs to stop the tab from reloading when pressing it twice.
 * ons-tabbar: The event 'reactive' is triggered when pressing the same tab twice if 'no-reload' is set.
 * ons-navigator: Fixed [#228](https://github.com/OnsenUI/OnsenUI/issues/228).
 * ons-switch: Fixed [#252](https://github.com/OnsenUI/OnsenUI/issues/252). Model change is now bound correctly when using ngModel.
 * css-components: Fixed [#177](https://github.com/OnsenUI/OnsenUI/issues/177). Checkboxes and radio buttons are now clickable on iOS.
 * ons-button: Added several methods to the component. 

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

