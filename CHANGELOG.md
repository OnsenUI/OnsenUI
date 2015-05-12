
CHANGELOG
====

v1.3.2
----
 * Fixed postchange event for carousel on IE11. Fixed [#646](https://github.com/OnsenUI/OnsenUI/issues/646).

v1.3.1
----
 * Fixed scrolling in Windows Phone. Fixed [#618](https://github.com/OnsenUI/OnsenUI/issues/618).

v1.3.0
----
 * ons-sliding-menu: Fixed [#544](https://github.com/OnsenUI/OnsenUI/issues/544).
 * ons-sliding-menu: Fixed [#464](https://github.com/OnsenUI/OnsenUI/issues/464).
 * ons-pull-hook: Fixed [#467](https://github.com/OnsenUI/OnsenUI/issues/467).
 * ons-pull-hook: Fixed issue where a error was thrown if the pull hook was destroyed before `$done()` was called.
 * core: Added end-to-end testing with Protractor.
 * ons-alert-dialog: Fixed [#478](https://github.com/OnsenUI/OnsenUI/issues/478).
 * ons-pull-hook: Fixed [#498](https://github.com/OnsenUI/OnsenUI/issues/498).
 * ons-navigator: Blocks events on pages while animation is running. This fixes [#457](https://github.com/OnsenUI/OnsenUI/issues/457) and also fixes the issue where pages were pushed/popped twice when tapping quickly.
 * ons-alert-dialog: Fixed [#511](https://github.com/OnsenUI/OnsenUI/issues/511).
 * ons-alert-dialog: Fixed [#512](https://github.com/OnsenUI/OnsenUI/issues/512).
 * core: `ons.createDialog`, `ons.createPopover` and `ons.createAlertDialog` can now be supplied with a scope object in order to specify the parent scope of the element. This makes data binding much easier.
 * ons-loading-placeholder: Fixed [#541](https://github.com/OnsenUI/OnsenUI/issues/541).
 * ons-loading-placeholder: The component can now be used anywhere.
 * ons-tabbar: Fixed [#530](https://github.com/OnsenUI/OnsenUI/issues/530).
 * ons-split-view: Fixed [#525](https://github.com/OnsenUI/OnsenUI/issues/525).
 * ons-sliding-menu: Added event handler attributes.
 * ons-alert-dialog: Added event handler attributes.
 * ons-carousel: Added event handler attributes.
 * ons-dialog: Added event handler attributes.
 * ons-navigator: Added event handler attributes.
 * ons-popover: Added event handler attributes.
 * ons-pull-hook: Added event handler attributes.
 * ons-split-view: Added event handler attributes.
 * ons-tabbar: Added event handler attributes.
 * ons-split-view: Fixed [#552](https://github.com/OnsenUI/OnsenUI/issues/552).
 * ons-navigator: Added `animation` option to `popPage()`.
 * ons-navigator: Added `replacePage()` method.
 * ons-lazy-repeat: Improved behavior when items are removed.
 * ons-sliding-menu: Fixed [#577](https://github.com/OnsenUI/OnsenUI/issues/577).
 * core: Windows Universal (Windows Phone 8.1, Windows 8.1 and IE 11)  partial support.

v1.2.2
----
 * ons-carousel: Fixed [#358](https://github.com/OnsenUI/OnsenUI/issues/358). Breaks compatibility with 1.2.1, `'swipeable'` attribute must be added to `<ons-carousel>` tags to made them touch swipeable.
 * ons-navigator: Fixed [#350](https://github.com/OnsenUI/OnsenUI/issues/350).
 * ons-navigator: Fixed broken Android slide animation.
 * ons-carousel: Added 'auto-refresh' attribute to automatically refresh carousel when items are added or removed in AngularJS.
 * ons-back-button: Automatically hide back button when there is only one page in the stack.
 * ons-scroller: Fixed [#389](https://github.com/OnsenUI/OnsenUI/issues/389).
 * ons-button: Fixed broken isDisabled() method.
 * ons-icon: Updated Ionicons to version 2.0.1.
 * ons-carousel: Fixed [#369](https://github.com/OnsenUI/OnsenUI/issues/369).
 * ons-popover: Fixed [#367](https://github.com/OnsenUI/OnsenUI/issues/367).
 * ons-carousel: Fixed [#365](https://github.com/OnsenUI/OnsenUI/issues/365).
 * ons-carousel: Fixed [#398](https://github.com/OnsenUI/OnsenUI/issues/398).
 * ons-carousel: Fixed [#353](https://github.com/OnsenUI/OnsenUI/issues/353). Added `overscroll` event and `event.waitToReturn(promise)` method.
 * ons-carousel: Fixed [#352](https://github.com/OnsenUI/OnsenUI/issues/352). Added `auto-scroll-ratio` attribute and related methods.
 * ons-carousel: When carousel is swipeable it doesn not propagate touch events to parent.
 * ons-switch: Added `ngChange` directive.
 * ons-button: Fixed so it can be used with `ngDisabled`.
 * ons-toolbar-button: Fixed so it can be used with `ngDisabled`. This fixes issue [#321](https://github.com/OnsenUI/issues/321).
 * ons-carousel: Fixed unresponsive carousel drag event for Android.
 * ons-carousel: Fixed [#401](https://github.com/OnsenUI/OnsenUI/issues/401).
 * ons-sliding-menu: Clicking outside the menu when it is open will now close it.
 * ons-sliding-menu: Fixed [#319](https://github.com/OnsenUI/OnsenUI/issues/319).
 * ons-tab: Implemented `persistent` attributed to prevent tab content from being destroyed when navigating to another tab.
 * ons-tabbar: Fixed broken `hide-tabs` attribute. ([atakayama](https://github.com/atakayama))
 * ons-pull-hook: Implemented `<ons-pull-hook>` component.
 * core: Removed the alias stack so variables like `ons.navigator` and `ons.slidingMenu` can not be used anymore.
 * core: Added `ons.componentBase` variable. All component variables are attached to this variable if it is truthy. Can be changed to avoid polluting the global scope. Default is `window`.
 * ons-lazy-repeat: Implemented `<ons-lazy-repeat>` component.
 * ons-carousel: Fixed [#359](https://github.com/OnsenUI/OnsenUI/issues/359).
 * ons-carousel: Fixed [#380](https://github.com/OnsenUI/OnsenUI/issues/380).
 * ons-sliding-menu: Fixed [#382](https://github.com/OnsenUI/OnsenUI/issues/382).
 * ons-popover: Fixed [#416](https://github.com/OnsenUI/OnsenUI/issues/416).
 * ons-carousel: Fixed strange behavior when carousel was smaller than container.
 * ons-split-view: Fixed bug where split view did not update correctly on some Android devices.

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

