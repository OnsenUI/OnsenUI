
CHANGELOG
====

v2.0.0-rc.1
----
 * ons-input: Fix behavior of `checked` attribute.
 * ons-popover: Fix glitch on iOS for bottom popover.
 * core: Fix [#1340](https://github.com/OnsenUI/OnsenUI/issues/1340) (auto status bar fill issue).

v2.0.0-beta.15
----
 * ons-carousel: Fix rendering glitch on Android 4.1.
 * core: Fix broken validation on Android 4.1.
 * ons-pull-hook: Update API (property `onAction` instead of `setActionCallback` method).

v2.0.0-beta.14
----
 * vendor: Add `MutationObserver` polyfill for older webviews.
 * ons-page: Fix [#1359](https://github.com/OnsenUI/OnsenUI/issues/1359).

v2.0.0-beta.13
----
 * ons-lazy-repeat: Fixes issue on Safari.

v2.0.0-beta.12
----
 * ons-alert-dialog: Only compile once. This fixes issue with `ons.notification` in Firefox.
 * css-components: Refine tab style.

v2.0.0-beta.11
----
 * core: Fixed forcePlatformStyling.
 * ons-navigator: Fixed an issue where 'show' event could be fired before 'init'.
 * ons-page: Removed unnecessary 'event.page' parameter.

v2.0.0-beta.10
----
 * core: Expose FastClick instance as `ons.fastClick`.
 * ons-navigator: Fixed a bug where popPage always showed the default animation.
 * ons-navigator: Fixed md-lift-animator.
 * ons-navigator: Removed small delay after Lift animators.
 * css-components: Fixed issue with list item using both "chevron" and "longdivider" modifiers.
 * core: Fixed an issue preventing users from selecting text in inputs and textareas.
 * ons-carousel: Added `auto-refresh` attribute.
 * ons-carousel: Fixed an issue causing improper carousel size when used with angular and ons-navigator.
 * ons-icon: Delete attribute `flip` from ons-icon (obsolete, since everything can be done with `rotate`)
 * ons-list-item: Make the attribute `tappable` a boolean and add attribute `tap-background-color`
 * ons-alert-dialog: Fixed [#1347](https://github.com/OnsenUI/OnsenUI/issues/1347).
 * ons-progress-bar, ons-progress-circular: Add `value`, `secondaryValue` and `indeterminate` properties.
 * ons-pull-hook: Add `state`, `pullDistance`, `height`, `thresholdHeight` and `disabled` properties.
 * ons-alert-dialog, ons-dialog, ons-popover, ons-modal: Updated API (`disabled`, `visible`, `onDeviceBackButton` properties).
 * ons-page: Update API (`disabled`, `onDeviceBackButton` properties, `on-device-back-button` and `ng-device-back-button` attributes).
 * ons-splitter: Renamed property `deviceBackButton` to a `onDeviceBackButton`.
 * ons-button, ons-ripple: Update API (`disabled` property).
 * ons-speeddial: Updated API (`disabled`, `visible`, `inline` properties).
 * ons-switch: Updated API (`disabled`, `checked`, `checkbox` properties).
 * ons-splitter-side: Changed `isOpen` to a property.
 * ons-navigator: Removed old angular methods (`getPages`, `getBackButtonHandler`).
 * ons-lazy-repeat: Removed `setDelegate` in favor of the `delegate` property.
 * ons-range: Fixes memory leak in AngularJS bindings.
 * ons-toolbar-button: Add `disabled` property.
 * css-components: Fixes list layout glitch on older Android devices.

v2.0.0-beta.9
----
 * ons-splitter: Fixed memory leak.
 * ons-page: Fixed [#1315](https://github.com/OnsenUI/OnsenUI/issues/1315).
 * ons-icon: Accepts two icon values at once for Auto Styling.
 * ons-tab: Fix glitch where content was removed during `<ons-navigator>` slide animation.
 * ons-splitter: Fix default side and swipe-target-width.
 * ons-carousel: Update API.
 * ons-icon: 'spin' attribute does not require boolean values anymore.
 * core: Fix DeviceBackButton dispatcher for pages containing SVG elements.
 * ons-navigator: Changed part of the API.
 * ons-navigator: Fixed [#1324](https://github.com/OnsenUI/OnsenUI/issues/1324), [#1325](https://github.com/OnsenUI/OnsenUI/issues/1325).

v2.0.0-beta.8
----
 * core: Small fix for Autostyling.
 * ons-list-item: Fix "tappable" attribute.
 * ons-navigator: Added default `options` poperty.
 * ons-navigator: Fixed flickering in Lift animation for iOS.
 * ons-page: Does not remove 'style' attribute anymore.
 * ons.notification: Fixed an issue in iOS related to CustomElements.
 * ons.ready: Waits for `WebComponentsReady` event instead of `DOMContentLoaded`.
 * ons-icon: Fixed a bug in old Android versions.
 * ons-page: Add onInfiniteScroll functionality [#1165](https://github.com/OnsenUI/OnsenUI/issues/1165).
 * ons-bottom-toolbar: Fixed a bug making it scroll with the content in some cases.
 * ons-carousel: Added `centered` attribute.
 * ons-popover: Added material popover.
 * ons-splitter: Fixed [#1300](https://github.com/OnsenUI/OnsenUI/issues/1300).
 * ons-list-item: Fix chevron position when list content is large.
 * ons-lazy-repeat: Auto calculate item height if no information is provided.
 * ons-carousel: Removes event listeners if it's not swipeable.
 * ons-splitter: Update API.

v2.0.0-beta.7
----
 * core: Automatic Styling feature depending on current platform.
 * core: Fixed [#1181](https://github.com/OnsenUI/OnsenUI/issues/1181).
 * ons-fab: Fixed [#1192](https://github.com/OnsenUI/OnsenUI/issues/1192).
 * ons-tabbar: Correctly applies animation-options.
 * ons-popover: Correctly applies animation-options.
 * ons-alert-dialog: Correctly applies animation-options.
 * ons-navigator: Closes [#1208](https://github.com/OnsenUI/OnsenUI/issues/1208).
 * ons-carousel: Accepts animation-options.
 * core: Async methods return promises. Closes [#1054](https://github.com/OnsenUI/OnsenUI/issues/1054).
 * ons-if: Added new conditional component with `platform` and `orientation` attributes.
 * ons-navigator: New Lift and Fade animators that match Material Design styles.
 * ons-input: Extended component to support type `checkbox` and `radio`.
 * ons-ripple: Can be added by using `ripple` attribute.
 * ons-tab: Tabs are always persistent.
 * ons-ripple: Improve ripple effect. Closes [#1193](https://github.com/OnsenUI/OnsenUI/issues/1193).
 * ons-switch: Switch is now draggable.
 * core: Use a global gesture detector to improve performance.
 * ons-splitter-side: Fixed [#1222](https://github.com/OnsenUI/OnsenUI/issues/1222).
 * css-components: Improve list item style.
 * ons.notification: Closes [#1127](https://github.com/OnsenUI/OnsenUI/issues/1127).
 * ons-splitter: Improved performance and fixed minor bugs.
 * ons-lazy-repeat: Fixed [[#1236](https://github.com/OnsenUI/OnsenUI/issues/1236), [#1029](https://github.com/OnsenUI/OnsenUI/issues/1029), [#470](https://github.com/OnsenUI/OnsenUI/issues/470)], and [#1035](https://github.com/OnsenUI/OnsenUI/issues/1035).
 * ons-input: Transparent style is now default in iOS (removed 'transparent' modifier).
 * ons-input: Update Angular bindings to work better with checkboxes and radio buttons.
 * ons-switch: Fix so it works inside a <label> element.
 * ons-ripple: Attach event listeners to parent to avoid blocking cliks.

v2.0.0-beta.6
----
 * css-components: Add San Francisco font for iOS9 devices.
 * css-components: Fixed [#1162](https://github.com/OnsenUI/OnsenUI/issues/1162).
 * ons-input: Add "ons-input" component and remove "ons-material-input" component.
 * ons-range: Add "ons-range" component.
 * ons-navigator: Fixed [#1175](https://github.com/OnsenUI/OnsenUI/issues/1175).
 * ons-tabbar: Fixed [#1184](https://github.com/OnsenUI/OnsenUI/issues/1184).

v2.0.0-beta.5
----
 * core: Add link to library in package.json for browserify, etc.

v2.0.0-beta.4
----
 * ons-tabbar: Fixed [#1132](https://github.com/OnsenUI/OnsenUI/issues/1132).
 * ons-tabbar: `no-reload` is now the default behavior.
 * ons-ripple: Fixed [#1140](https://github.com/OnsenUI/OnsenUI/issues/1140).
 * ons-navigator: Fixed Fade animator export.
 * ons-material-input: Make it resizable.
 * Added ons-lazy-repeat custom element.
 * core: Use [rollup.js](http://rollupjs.org/) for bundling.
 * ons-tabbar: Fixed [#1158](https://github.com/OnsenUI/OnsenUI/issues/1158).
 * ons-lazy-repeat: Remove "display: block" rule for Angular bindings.

v2.0.0-beta.3
----
 * core: Fixed animationOptions parsing.
 * ons-back-button: Add "material" modifier.
 * ons-range: Fixed [#1082](https://github.com/OnsenUI/OnsenUI/issues/1082).
 * ons-popover: Added callback for `show` and `hide` methods.
 * ons-back-button: Accepts `options` object. Fixed [#1040](https://github.com/OnsenUI/OnsenUI/issues/1040).
 * ons-list-item: Fixed "tappable" modifier behavior on iOS. Fixed [#740](https://github.com/OnsenUI/OnsenUI/issues/740).
 * core: Implemented ES6 imports.
 * css-components: Fixed flexbox for MD styles in toolbar.
 * core: Fixed [#1085](https://github.com/OnsenUI/OnsenUI/issues/1085)
 * ons-alert-dialog: [BC] Changed DOM structure to improve performance. Fixed [#1008](https://github.com/OnsenUI/OnsenUI/issues/1008).
 * ons-dialog: [BC] Changed DOM structure to improve performance.
 * ons-dialog, ons-alert-dialog, ons-popover: removed iOS shadow to match the original.
 * Changed the directory structure.
 * ons-list-item: Add "tappable" attribute.
 * ons-list-item: Add child classes to make it easier to compose lists.

v2.0.0-beta.2
----
 * css-components: Adjust Material navbar layout.

v2.0.0-beta.1
----
 * ons-fab: Fix broken layout on Safari.
 * ons-toolbar: Improve layout of material toolbar.
 * ons-progress: Splitted into two different components `ons-progress-bar` and `ons-progress-circular`.
 * css-components: Added `material` modifier on tab-bar components.
 * css-components: [BC-BREAK] Removed `android` modifier on all components.
 * css-components: iOS toggle switch style updated.
 * ons-tabbar: Add "material" modifier.
 * ons-sliding-menu: Fix broken `_currentPageUrl` property.
 * core: Fix status bar filling on iOS when using `device` plugin.
 * css-components: Fix Material navbar title on iOS.

v2.0.0-beta
----
 * core: Added more customizable animations.
 * core: [BC Break] Changed interfaces for registering custom animators on `ons-navigator`, `ons-dialog`, `ons-alert-dialog`, `ons-dialog`, `ons-sliding-menu`, `ons-popover` and `ons-tabbar`.
 * core: Removed unneeded iScroll library.
 * ons-scroller: [BC Break] Removed undocumented attributes and simplified DOM structure in ons-scroller elements.
 * ons-button: [BC Break] Removed animation feature and related attributes.
 * ons-modal: Added animations and animation options.
 * ons-alert-dialog: Added `submitOnEnter` parameter for `ons.notification.prompt()`.
 * ons-list-item: Added `tight` modifier.
 * ons-if-platform: Supports multiple space separated values.
 * ons-pull-hook: Added `getPullDistance`, `getHeight`, `getThresholdHeight` methods.
 * ons-pull-hook: Added `fixed-content` attribute.
 * ons.platform: Added `select` method to force a rendering platform.
 * ons-sliding-menu: Now supports `ngController` directive.
 * ons-split-view: Now support `ngController` directive.
 * ons-tabbar: Added `'slide'` animation.
 * ons: Added `disableAnimations` and `enableAnimations` to control animations display.
 * ons-loading-placeholder: Added `ons.resolveLoadingPlaceholder()` to delay resolving the placeholder.
 * ons-page: [BC Break] Removed undocumented several methods on `ons-page` component.
 * css-components: Stylus components don't rely on custom functions anymore.
 * ons-navigator: Added `options.refresh` parameter for `popPage()`.
 * ons-carousel: Carousel will now apply the specified padding to the items.
 * ons-icon: Fixed [#687](https://github.com/OnsenUI/OnsenUI/issues/687).
 * ons-icon: Fixed [#688](https://github.com/OnsenUI/OnsenUI/issues/688).
 * ons-page: Added page life cycle events.
 * ons-list-item: Added `lock-on-drag` attribute to prevent vertical scrolling when user pans left or right.
 * ons-modal: Added `isShown()` method.
 * ons-navigator: Fixed `insertPage()` behaviour with high or low indexes.
 * ons-tabbar: Fixed callback in `setActiveTab()` method.
 * ons-tabbar: persistent tabs only throw 'init' event once.
 * core: every child element will be wrapped inside an ons-page.
 * ons-page: added page lifecycle events API
 * ons-splitter: Added `ons-splitter`, `ons-splitter-side`, `ons-splitter-content` and `ons-splitter-mask` custom elements.
 * ons-fab: Implemented 'fab' component.
 * core: Added page attribute expressions.
 * ons.notification: Added `defaultValue`, `placeholder` and `autofocus` options to prompt.
 * ons-sliding-menu: Fixed [#879](https://github.com/OnsenUI/OnsenUI/issues/879)
 * ons-navigator: Added `bringPageTop()` method.
 * ons-carousel: Added `getCarouselItemCount()` method.
 * core: Add `ons-scope` Angular directive to allow not binding component to `$rootScope`.
 * ons-lazy-repeat: Add `reload()` method to delegate object to enable manual reloading.
 * ons-lazy-repeat: Fix layout of list when it's not placed on top of page.
 * ons-speed-dial: Implemented `<ons-speed-dial>` component.
 * ons-alert-dialog: Added "material" modifier.
 * ons-button: Added "material" modifier.
 * ons-dialog: Added "material" modifier.
 * ons-icon: Added "md-" prefix and support for material icon font.
 * ons-material-input: Added material input component with floating label.
 * ons-progress: Added Material progress bar and circular loader.
 * ons-ripple: Added Material Design ripple effect component.
 * ons-switch: Added "material" modifier.
 * ons-toolbar-button: Added "material" modifier.
 * ons-toolbar: Added "material" modifier.
 * ons-back-button: Change style when parent toolbar has modifier "material".
 * ons-list: Added "material" modifier.
 * ons-tabbar: Fixed [#929](https://github.com/OnsenUI/OnsenUI/issues/948)
 * ons-splitter: Fixed [#952](https://github.com/OnsenUI/OnsenUI/issues/952).
 * core: Add support for Browserify.
 * ons.platform: uses cordova-plugin-device if installed.
 * ons-back-button: automatically hides if navigator has only 1 page.

v1.3.14
----
* ons-tabbar: Fixed [#963](https://github.com/OnsenUI/OnsenUI/issues/963).

v1.3.13
----
* ons-popover: Fixed [#880](https://github.com/OnsenUI/OnsenUI/issues/880).
* ons-carousel: Fixed [#929](https://github.com/OnsenUI/OnsenUI/issues/929).
* dependencies: Fixed [#936](https://github.com/OnsenUI/OnsenUI/issues/936).
* ons-lazy-repeat: Fixed [#966](https://github.com/OnsenUI/OnsenUI/issues/966).
* ons-sliding-menu: Fixed [#967](https://github.com/OnsenUI/OnsenUI/issues/967).
* ons-pull-hook: Fixed [#969](https://github.com/OnsenUI/OnsenUI/issues/969).
* ons-navigator: Fixed [#1018](https://github.com/OnsenUI/OnsenUI/issues/1018).

v1.3.12
----
* ons-page: Fix status bar fill for iOS9.

v1.3.11
----
* ons-tabbar: Remove flickering when navigator is a child of tabbar.
* ons-dialog: Fixed broken `mask-color` attribute.

v1.3.10
----
* ons-tabbar: Fixed [#891](https://github.com/OnsenUI/OnsenUI/issues/891).

v1.3.9
----
* ons-carousel: Fixed [#844](https://github.com/OnsenUI/OnsenUI/issues/844).
* ons-navigator: Fixed [#865](https://github.com/OnsenUI/OnsenUI/issues/865).
* core: Fixed [#845](https://github.com/OnsenUI/OnsenUI/issues/845).
* ons-lazy-repeat: Added debouncing to increase performance on iOS.
* core: FastClick patched to support setting the system clock back.

v1.3.8
----
* ons-lazy-repeat: Recalculate heights when number of items change in order to support dynamic lists with variable height items.
* ons-lazy-repeat: Don't wait to render to make the list more responsive.

v1.3.7
----
 * core: Fixed [#632](https://github.com/OnsenUI/OnsenUI/issues/632).

v1.3.6
----
 * ons-sliding-menu: Fixed swipeable default behaviour related to AngularJS update.

v1.3.5
----
* core: Updated AngularJS to version 1.4.3.
* core: Fixed [#777](https://github.com/OnsenUI/OnsenUI/issues/777).
* core: Fixed [#767](https://github.com/OnsenUI/OnsenUI/issues/767).

v1.3.4
----
 * ons-dialog: Fixed a memory leak when using parentScope. Closes [#735](https://github.com/OnsenUI/OnsenUI/issues/735).
 * ons-alert-dialog: Fixed a memory leak when using parentScope.
 * ons-popover: Fixed a memory leak when using parentScope.

v1.3.3
----
 * ons-lazy-repeat: Fixed [#678](https://github.com/OnsenUI/OnsenUI/issues/678).
 * ons-navigator: Added `leavePage` and `enterPage` objects to prepop event.
 * ons-sliding-menu: Fixed broken `swipe-target-width` attribute.
 * ons-back-button: Prevent popping page twice on double tap.
 * ons-lazy-repeat: Fix bug that caused infinite digest loops.
 * ons-tabbar: Fix broken `persistent` attribute.
 * ons-carousel: Fix bug where items were incorrectly cached.
 * ons-navigator: Fix bug in `insertPage()` when pages are inserted on top.
 * ons-scroller: Fixed [#707](https://github.com/OnsenUI/OnsenUI/issues/707).
 * ons-carousel: Fixed a random error when event was undefined.

v1.3.2
----
 * ons-carousel: Fixed `postchange` event for carousel on IE11. Fixed [#646](https://github.com/OnsenUI/OnsenUI/issues/646).

v1.3.1
----
 * ons-page: Fixed scrolling on Windows Phone. Fixed [#618](https://github.com/OnsenUI/OnsenUI/issues/618).

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
 * core: FastClick library updated to 1.0.6. This adds support for iOS 8.4+, earlier versions of Onsen UI will not work with iOS 8.4+.

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

 * core: Fixed broken navigation-bar layout on running with iOS Cordova in some cases.
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
