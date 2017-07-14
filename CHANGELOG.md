
CHANGELOG
====

dev
----

### New Features

 * core: Added `ons.modifier` object with a new set of methods to alter `modifier` attributes.
 * ons-modal: Added `lift` animation ([#2078](https://github.com/OnsenUI/OnsenUI/pull/2078)).
 * ons-navigator: iOS Swipe-to-pop.
 * ons-icon: Allows CSS classes with `background-image` (or any other property) as custom icon names.

### Bug Fixes

 * css-components, ons-list-item: Fixed [#2100](https://github.com/OnsenUI/OnsenUI/issues/2100).
 * ons-tab: Custom classes can be passed to its `icon` attribute. Fixed [#2108](https://github.com/OnsenUI/OnsenUI/issues/2108).
 * ons-list: Fixed double top border when located right under toolbar.
 * ons-carousel: Ignores swipes that start outside carousel.
 * Swipeable components: Swipe is now smoother.
 * Swipeable components: Fixed compatibility of some swipeable components.

### Misc

 * Added ripple effects properly on `ons-range`, `ons-checkbox`, `ons-radio-button`, `ons-toolbar-button` and `ons-alert-dialog` buttons for Material Design.
 * Added `ons-alert-dialog-button` elements.
 * Added `size` attribute on `ons-ripple` elements.
 * css-components: Adjusted font size of `.back-button__label` (improves iOS slide animation).

### BREAKING CHANGES

 * ons-icon: Due to [#2108](https://github.com/OnsenUI/OnsenUI/issues/2108) fix, `fa-` prefix is not added automatically anymore to the icon name. In other words, Font Awesome icons must specify `fa-` prefix manually (`icon="bars"` => `icon="fa-bars"`).

v2.4.2
----

### New Features

 * ons-fab: Added new appearances for iOS.
 * ons-ripple: Added `size` attribute.

### Bug Fixes

 * Revert a recent change that creates `ons-tabbar` issues. Fixed [#2082](https://github.com/OnsenUI/OnsenUI/issues/2082).

v2.4.1
----

### Bug Fixes

 * ons.notification.prompt: Only returns input value if the clicked button is primary. Otherwise, returns null. Fixed [#2050](https://github.com/OnsenUI/OnsenUI/issues/2050).
 * ons-input, ons-search-input: Fixed [#2075](https://github.com/OnsenUI/OnsenUI/issues/2075).
 * ons-icon: Its class attribute is now recovered after modifications.

### Misc

 * css-components: Removed `.text-input--transparent` modifier (same as default style).

v2.4.0
----

### New Features

 * core: Separated files are now cached after the first request. This improves performance when pushing pages.
 * core: Added `ons.preload` method to manually cache templates. This improves performance when pushing pages.
 * core: Support for `HTMLTemplateElement` (`<template>`). The former `<ons-template>` is still supported for backward compatibility.
 * core: Added page life-cycle hooks (similar to life-cycle events). `<template>` elements allow `<script>` tags in their content, which is useful for initialising pages. Therefore, hooks like `pageElement.onInit`, `pageElement.onShow`, etc. have been added.
 * ons-progress-bar, ons-progress-circular: Added new appearances for iOS.

### Bug Fixes

 * css-components: Fixed incorrect image path (select, search input).
 * ons-tabbar, ons-lazy-repeat, ons-carousel: `ons-tabbar` now applies `visibility:hidden` instead of `display:none` to pages. This fixes issues for `ons-lazy-repeat` and `ons-carousel` inside `ons-tabbar`.
 * ons-carousel: Fixed [#2065](https://github.com/OnsenUI/OnsenUI/issues/2065).

### Misc

 * css-components: Refined the appearance of `checkbox` on iOS.
 * css-components: Refined the appearance of `radio-button` on iOS.
 * css-components: Refined the appearance of `button` on Android.
 * css-components: Refined the appearance of `progress-bar` on Android.
 * css-components: Refined the appearance of `progress-circular` on Android.
 * css-components: Refined the appearance of `checkbox` animation on Android.
 * css-components: Refined the appearance of `list-item--chevron`.
 * core: Updated `font-awesome` icon library.
 * ons-toast: Improved `ascend` animator performance.

### BREAKING CHANGES

 * ons-input: It has been split into different elements: `ons-input` for text types; `ons-checkbox` for checkboxes; `ons-radio` for radio buttons; and `ons-search-input` for styled search inputs.
     * `<ons-input type="radio" checked>` => `<ons-radio checked>`

v2.3.3
----

### New Features

 * onsenui.d.ts: Enabled `import * as ons from 'onsenui';` in TypeScript.
 * onsenui.d.ts: Added definitions for Onsen UI 2.3.x.

### Misc

 * core: Added warning which is shown when Onsen UI is loaded more than once.

v2.3.2
----

### New Features

 * css-components: Added `--material` modifier on `notification` CSS components.

### Bug Fixes

 * ons-page: Fixed iOS status-bar-fill not added in initially opened modals ([#1944](https://github.com/OnsenUI/OnsenUI/issues/1944)).
 * ons-splitter: Fixed `reveal` animation glitch.
 * ons-action-sheet: Fixed glitch when hiding on iOS.

### Misc

 * css-components: Refined the appearance of `select`. Fixed [#2017](https://github.com/OnsenUI/OnsenUI/issues/2017).
 * css-components: Refined the appearance of `range` on iOS.
 * core: Excluded test cases from `onsenui` package.

v2.3.1
----

### Misc

 * Remove `module` property from `package.json` temporarily.

v2.3.0
----

### New Features

 * css-components: Added `action-sheet` component.
 * css-components: Added `toast` component.
 * css-components: Added `card` component.
 * css-components: Added `segment` component.
 * core: Added `ons-action-sheet` and `ons-action-sheet-button` elements.
 * core: Added `ons-toast` element.
 * core: Added `ons-card` element.
 * core: Added new method `ons.openActionSheet(...)` for creating inline `ons-action-sheet` elements.
 * core: Added new method `ons.notification.toast(...)` for creating inline and queued `ons-toast` elements.
 * core: Added new method `ons.createElement(...)` that allows creating new elements from templates or inline HTML.
 * core: `onsenui` is now available as ES Modules.
 * core: A fake device back button event is now fired on ESC press.
 * ons-navigator: Added `removePage` method.
 * ons-input: Added styling support for `type='search'`.
 * angular1: Added `ons-action-sheet` bindings.
 * angular1: Added `ons-toast` bindings.
 * angular1: Added `ons-card` bindings.
 * angular1: Added `ons-list-title` bindings.

### Bug Fixes

 * css-components: Fixed color of range component in Firefox. Fixed [#1964](https://github.com/OnsenUI/OnsenUI/issues/1964).
 * core: Fixed broken sourcemap of `onsenui.js` ([#1958](https://github.com/OnsenUI/OnsenUI/issues/1958)).
 * ons-carousel: Fixed [#1952](https://github.com/OnsenUI/OnsenUI/issues/1952).
 * ons-carousel: `refresh` event is now triggered when resized.
 * ons-dialog: Fixed `disabled` attribute.
 * ons-dialog: Fixed `mask-color` attribute.
 * ons-splitter: Fixed `animation` attribute issue.
 * angular1: Page loader now throws `destroy` event when page is unloaded.
 * angular1: `myNavigator.topPage.data` should now be ready by the time the controller runs. Fixed [#1854](https://github.com/OnsenUI/OnsenUI/issues/1854).

### Misc

 * core: Removed polyfill for `Element.prototype.remove`.
 * core: Removed polyfill for `Element.prototype.classList`.
 * core: Removed polyfill for `Promise`.
 * core: Removed polyfill for `CustomEvent`.
 * core: Removed [JavaScript Dynamic Content shim for Windows 8 Store apps](https://github.com/Microsoft/winstore-jscompat).

### BREAKING CHANGES

 * ons-navigator: Removed `options.refresh`. `prepop` event and `removePage` can be used instead.
 * ons-template, external files: `ons-page` tag is not added automatically anymore as a wrapper of the target template. It must be manually specified.
 * ons.createDialog, ons.createPopover, ons.createAlertDialog: Tags like `<ons-dialog>`, `<ons-alert-dialog>` or `<ons-popover>` are not added automatically anymore to the target template, they must be manually specified instead.
 * ons.notification: Canceled notifications do not reject the returned promise anymore. Instead, when canceled they resolve to `-1` for `alert` and `confirm`, or `null` for `prompt`.
 * angular1: Removed `onsSlidingMenu` and `onsSplitView` directives.

v2.2.6
----

### Bug Fixes

 * ons-splitter: Fixed timing for initial animations in bindings ([#1979](https://github.com/OnsenUI/OnsenUI/issues/1979), [#1985](https://github.com/OnsenUI/OnsenUI/issues/1985)).
 * ons-tabbar: Minor fix for situations where the '.page__content' is provided ([#1978](https://github.com/OnsenUI/OnsenUI/issues/1978)).
 * ons-input: Fixed [#1974](https://github.com/OnsenUI/OnsenUI/issues/1974).
 * Device back button: Fixed possible crash in old platforms ([#1983](https://github.com/OnsenUI/OnsenUI/issues/1983)).

v2.2.5
----

### New Features

 * css-components: Added `list-title` component ([#1960](https://github.com/OnsenUI/OnsenUI/issues/1960)).
 * core: Added `ons-list-title` element.
 * ons-splitter: Added `push` and `reveal` animations ([#1916](https://github.com/OnsenUI/OnsenUI/issues/1916)).

### Bug Fixes

 * core: Polyfill `Set` and `Map` in order to support old browsers ([#1967](https://github.com/OnsenUI/OnsenUI/issues/1967)).
 * ons-navigator: Discard toolbars inside tabbars for ios-slide.
 * ons-carousel: Fixed [#1952](https://github.com/OnsenUI/OnsenUI/issues/1952).
 * ons-pull-hook: Fixed [#1970](https://github.com/OnsenUI/OnsenUI/issues/1970).
 * angular1: Page loader now throws `destroy` event when page is unloaded ([#1934](https://github.com/OnsenUI/OnsenUI/issues/1934)).
 * angular1: `myNavigator.topPage.data` should now be ready by the time the controller runs. Fixed [#1854](https://github.com/OnsenUI/OnsenUI/issues/1854).

### Misc

 * Restored `bower.json`.
 * Refactored `ons-alert-dialog`, `ons-dialog`, `ons-modal` and `ons-popover` ([#1935](https://github.com/OnsenUI/OnsenUI/issues/1935)).

v2.2.4
----

### Bug Fixes

 * core: Fixed broken parts of CE1 polyfill which caused a broken behavior of `vue-onsenui` ([#1925](https://github.com/OnsenUI/OnsenUI/issues/1925)).
 * ons-splitter-content: Fixed [#1772](https://github.com/OnsenUI/OnsenUI/issues/1772) and [#1930](https://github.com/OnsenUI/OnsenUI/issues/1930).
 * ons-input: Added initial date value support. Fixed [#1603](https://github.com/OnsenUI/OnsenUI/issues/1603).
 * ons-switch: Fixed [#1920](https://github.com/OnsenUI/OnsenUI/issues/1920).
 * ons-progress-circular: Fixed [#1921](https://github.com/OnsenUI/OnsenUI/issues/1921).

### Misc

 * Removed `bower.json`.

v2.2.3
----

### Bug Fixes

 * core: Improve overall stability of the core on iOS by replacing Custom Elements v1 polyfill ([#1892](https://github.com/OnsenUI/OnsenUI/issues/1892)).

v2.2.2
----

### New Features

 * angular1: `ons-back-button` default behavior is now overriden if `ng-click` is provided ([#1749](https://github.com/OnsenUI/OnsenUI/issues/1749)).

### Bug Fixes

 * css-components: Fixed [#1896](https://github.com/OnsenUI/OnsenUI/issues/1896).
 * core: Use `self` in `setImmediate` polyfill ([#1903](https://github.com/OnsenUI/OnsenUI/issues/1903)).
 * core: Make `ons.platform.isSafari()` compatible with Safari 10 ([#1910](https://github.com/OnsenUI/OnsenUI/issues/1910)).
 * ons-lazy-repeat: Fixed [#1899](https://github.com/OnsenUI/OnsenUI/issues/1899) and [#1871](https://github.com/OnsenUI/OnsenUI/issues/1871).
 * ons-splitter: Overlay animation correctly hides mask when entering split mode if the menu was visible before.
 * angular1: Fixed [#1884](https://github.com/OnsenUI/OnsenUI/issues/1884).

v2.2.1
----

### New Features

 * css-components: Add minimized css-components file on `build/css/onsen-css-components.min.css`.

### Bug Fixes

 * ons-navigator: iOS Slide animation can now find toolbars that are not immediate children of the pages.
 * ons-splitter: mask is hidden only if all splitter-sides are in split mode.
 * ons-tab: It shows the last visible page instead of the initial one when reattached.
 * ons-pull-hook: Its content is not visible anymore during toolbar transitions.
 * ons-fab: It is now initally hidden and shown only when its page container is pushed. This fixes page transitions.
 * ons-fab: Covers the toolbar.
 * ons-fab: Hide animation on popPage is now visible.
 * ons-speed-dial: Hide items animation on popPage is now visible.
 * ons-input: text selection in Firefox.
 * ons-icon: Fixed [#1890](https://github.com/OnsenUI/OnsenUI/issues/1890).

### Misc

 * css-components: Refactored some components.

v2.2.0
----

### New Features

 * ons-switch: Supports `value` attribute.
 * ons-tab: Supports `active-icon` attribute.
 * ons-lazy-repeat: Support for dynamic height.
 * angular1: Add `onsSelect` directive working with `ngModel`.

### Bug Fixes

 * css-components: Fixed broken popover components.
 * css-components: Fixed [#1653](https://github.com/OnsenUI/OnsenUI/issues/1653).
 * core: Fix `autoprefixer` settings for `onsenui.css`.
 * core: Fixed [#1700](https://github.com/OnsenUI/OnsenUI/issues/1700).
 * ons-select: Fix width of the inner element.
 * ons-dialog: Fix broken `default` and `slide` animation in iOS 9 and iOS 10.
 * ons-popover: Fixed behavior on device back button.
 * ons-splitter: Checks if content exists before removing.
 * ons-carousel: Supports `animation` attribute.
 * ons-lazy-repeat: Clean first item scope.
 * ons-progress-circular: Fixed [#1860](https://github.com/OnsenUI/OnsenUI/issues/1860).
 * ons.notification: Fixed [#1787](https://github.com/OnsenUI/OnsenUI/issues/1787).
 * ons-row: Fixed [#1858](https://github.com/OnsenUI/OnsenUI/issues/1858).
 * angular1: `number input` retains number type variable with `ngModel`.
 * angular1: Fixed [#1843](https://github.com/OnsenUI/OnsenUI/issues/1843).
 * angular1: Fixed [#1799](https://github.com/OnsenUI/OnsenUI/issues/1799).

### Misc

 * css-components: Refactored `range` components.
 * ons-template: Show warning when ons-template is not located just under document.body.
 * ons-navigator: Added deprecate warning for `options.refresh`.
 * angular1: Added deprecate warnings to `ons-sliding-menu` and `ons-split-view`.

### BREAKING CHANGES

 * css-components: Dropped all stylus and rebuild css-components with cssnext.
 * css-components: Renamed `.tab-bar` to `.tabbar`.
 * css-components: Renamed `.navigation-bar` to `.toolbar`.
 * css-components: Renamed `.list__item` to `.list-item`.
 * css-components: Renamed `.list__header` to `.list-header`.
 * css-components: Changed `.button-bar__item > input` to `.button-bar__input`.
 * ons-tabbar: loadPage method has been deprecated.
 * ons-popover: Changed internal DOM structure.
 * ons-range: Changed internal DOM structure.

v2.1.0
----

 * core: Add new component `ons-select`.
 * core: All component classes exposes event list with static getter `events`.
 * ons-navigator, ons-page: Fixed the issue that pushed options is always empty on Angular2-binding and macOS Safari.
 * ons-navigator: Fixed [#1726](https://github.com/OnsenUI/OnsenUI/issues/1726).
 * ons-navigator: Animations block the interaction.
 * ons-navigator: Fix ternary operator error on `options.leavePage`.
 * ons-splitter: Add `side` property.
 * ons-splitter: Check content before hide/destroy.
 * ons-tab: Default click behavior can be overwritten by setting `onClick` property.
 * ons-tabbar: Add `show` method, `hide` method and `visible` property.
 * ons-dialog, ons-alert-dialog, ons-popover: User created dialogs are not moved inside page content.
 * ons-popover: `show` supports `options.target`.
 * ons-speed-dial: `show`, `hide`, `showItems`, `hideItems`, `toggle` and `toggleItems` now return Promise.
 * ons-fab: Execute `this.show()` and some statements before `contentReady`.
 * angular1: Fix `load` method of `ons-splitter-content`.

### BREAKING CHANGES

 * ons-input: Deprecate `content-left` attribute.
 * css-components: Rename undocumented modifier `one` to `rowfooter`.

v2.0.5
----
 * core: Changed all elements to have default className token always. Fixed [#1711](https://github.com/OnsenUI/OnsenUI/issues/1711).
 * ons-switch: Fix `disbled` to `disabled`.
 * angular1: Fix [#1677](https://github.com/OnsenUI/OnsenUI/issues/1677).
 * ons-tabbar: Fix [#1654](https://github.com/OnsenUI/OnsenUI/issues/1654).
 * ons-input: Fix `float` attribute style.
 * ons-input: Added `transparent` modifier for Material Design.
 * ons-modal: Pages inside modal throw show and hide events.
 * ons-page: Fixed infinite scroll for iOS.
 * core: All animators are extendable.
 * angular1: $event in event handlers is not empty anymore.
 * core: Remove Windows Phone 10+ support temporarily.
 * ons-carousel: initial-index works when the carousel is inside ons-navigator.
 * ons-switch: Always triggers custom events and stops propagation from inner element events.
 * ons-tab: Throws verbose error if cannot create pageElement.
 * ons-dialog: Fix broken dialog animation on iOS 9.x and 10.x caused by `dialog-container` class.

v2.0.4
----
 * angular1: Fix issue in event removal.
 * ons-pull-hook: Fixed bug where ons-pull-hook does not work when we swipe up/down a screen too fast.
 * ons-tab: Fixed [#1593](https://github.com/OnsenUI/OnsenUI/issues/1593).
 * core: Use [yarn](https://yarnpkg.com/) for dependency management.

v2.0.3
----
 * ons-page: Fixed [#1649](https://github.com/OnsenUI/OnsenUI/issues/1649).

v2.0.2
----
 * ons-switch: Fix regression where `change` event was not being triggered in some cases.
 * angular1: Fix [#1609](https://github.com/OnsenUI/OnsenUI/issues/1609).
 * ons-toolbar: transparent modifier supports MD.
 * ons-toolbar-button: Style refactor.
 * ons-navigator: Fix show-init event order.
 * ons-tab: Add `badge` attribute to display notification on tab.
 * ons.notification: Added `options.inputType` and `options.class`.
 * ons.notification: Fix [#1638](https://github.com/OnsenUI/OnsenUI/issues/1638).
 * ons.notification: Fixed memory leak.
 * angular1: Fix [#1620](https://github.com/OnsenUI/OnsenUI/issues/1620).
 * ons-icon: Fix [#1636](https://github.com/OnsenUI/OnsenUI/issues/1636).
 * ons-tabbar, ons-tab: Fix [#1584](https://github.com/OnsenUI/OnsenUI/issues/1584), [#1629](https://github.com/OnsenUI/OnsenUI/issues/1629).
 * angular1: Fix minor memory leak in Navigator.
 * ons-splitter: Fix [#1605](https://github.com/OnsenUI/OnsenUI/issues/1605).
 * core: Fix [#1646](https://github.com/OnsenUI/OnsenUI/issues/1646).

v2.0.1
----
 * angular1: Fix [#1588](https://github.com/OnsenUI/OnsenUI/issues/1588).
 * ons.notification: Fix [#1595](https://github.com/OnsenUI/OnsenUI/issues/1595).
 * ons-lazy-repeat: Fix [#1613](https://github.com/OnsenUI/OnsenUI/issues/1613).
 * core: Removed all `_compiled` attributes.
 * core: Disabled native Custom Elements v1 implementations.

v2.0.0
----
 * ons-splitter-side: Fix attribute watchers.
 * ons-range: Fix [#1554](https://github.com/OnsenUI/OnsenUI/issues/1554).
 * ons-page: Fixed dependency problem between ons-page and ons-toolbar.
 * ons-ripple: Fix timing issue on older Android WebViews.
 * core: Replace Promise polyfill to avoid Webpack warning.

v2.0.0-rc.18
----
 * ons-navigator: Fixed a bug that caused missing .page__content on Safari.
 * angular1: Use the `$templateCache` service.
 * ons-splitter: Fix [#1537](https://github.com/OnsenUI/OnsenUI/issues/1537).
 * core: Update to Custom Elements v1.
 * ons-navigator: Provides animators and allows to extend them.

v2.0.0-rc.17
----
 * core: Update Typescript definitions.

v2.0.0-rc.16
----
 * ons-splitter-side, ons-splitter-content: Added "page" and "pageLoader" property. Changed to use page-loader instead of `ons._internal.getPageHTMLAsync()`.
 * ons-navigator: Added "page" and "pageLoader" property. Changed to use page-loader instead of `ons._internal.getPageHTMLAsync()`.
 * ons-tabbar, ons-tab: Added "page" and "pageLoader" property. Changed to use page-loader instead of `ons._internal.getPageHTMLAsync()`.
 * core: Added ons.defaultPageLoader and ons.PageLoader.
 * ons-page: Changed to accept ".content" and ".background" elements as child contents.
 * ons-modal: Fix [#1433](https://github.com/OnsenUI/OnsenUI/issues/1433).
 * ons-navigator: Improved iOS slide animation (again).
 * ons-icon: Fix [#1352](https://github.com/OnsenUI/OnsenUI/issues/1352).
 * ons-pull-hook, ons-carousel: Fix [#1004](https://github.com/OnsenUI/OnsenUI/issues/1004).
 * ons-fab: Fix [#1496](https://github.com/OnsenUI/OnsenUI/issues/1496).
 * ons-list-item: Fix [#1499](https://github.com/OnsenUI/OnsenUI/issues/1499)
 * ons-tabbar: Fix [#1501](https://github.com/OnsenUI/OnsenUI/issues/1501)
 * ons-navigator: Fix [#1512](https://github.com/OnsenUI/OnsenUI/issues/1512). This changes `pages` property from an `HTMLCollection` to an `Array`.
 * ons-page, ons-toolbar, ons-bottom-toolbar, ons-modal, ons-speed-dial: Improved location logic
 * ons-fab: Now stays outside of `.page__content` when it has a `position` attribute.
 * ons-modal: Fix [#1511](https://github.com/OnsenUI/OnsenUI/issues/1511).
 * ons-lazy-repeat: Expose `refresh()` method to user through delegate object.
 * ons-pull-hook: Remove DOM mutations to make it easier to integrate with frameworks and libs.
 * ons-tab: Fix [#1528](https://github.com/OnsenUI/OnsenUI/issues/1528).
 * ons-navigator: `data` object for `popPage`.

v2.0.0-rc.15
----
 * ons-navigator: Improved iOS slide animation. Fix [#1457](https://github.com/OnsenUI/OnsenUI/issues/1457).
 * ons.platform: Fix [#1482](https://github.com/OnsenUI/OnsenUI/issues/1482).
 * ons-modal: Support showing on init.
 * ons-speed-dial: Add bindings for AngularJS 1.x.
 * ons-fab: Add bindings for AngularJS 1.x.
 * ons-pull-hook: Fix flickering on iOS.

v2.0.0-rc.14
----
 * core: Update TypeScript definitions.

v2.0.0-rc.13
----
 * ons-dialog: Fix Chrome issue with invalid event name.

v2.0.0-rc.12
----
 * core: Added type definitions.
 * ons-switch: Fix [#1464](https://github.com/OnsenUI/OnsenUI/issues/1464).
 * ons-splitter: Fix [#1392](https://github.com/OnsenUI/OnsenUI/issues/1392).

v2.0.0-rc.11
----
 * core: Added binding for Angular2.
 * ons-input: Fix `value` property bug for radio and checkbox.
 * ons-navigator: Fix [#1449](https://github.com/OnsenUI/OnsenUI/issues/1449).
 * ons-popover: Fix [#1450](https://github.com/OnsenUI/OnsenUI/issues/1450).
 * ons-navigator: Fix [#1389](https://github.com/OnsenUI/OnsenUI/issues/1389).
 * ons-popover: Fix [#1388](https://github.com/OnsenUI/OnsenUI/issues/1388).
 * ons-navigator: Fix [#1430](https://github.com/OnsenUI/OnsenUI/issues/1430).
 * ons-splitter-side: Use imported `orientation` object instead of global.
 * ons-navigator: Fix [#1453](https://github.com/OnsenUI/OnsenUI/issues/1453).

v2.0.0-rc.10
----
 * ons-navigator: Fix [#1440](https://github.com/OnsenUI/OnsenUI/issues/1440).
 * ons-toolbar, ons-speed-dial: Fix [#1441](https://github.com/OnsenUI/OnsenUI/issues/1441).
 * ons-splitter-side: Fix `_width` property.
 * css-components: Fixed list divider modifiers for MD.
 * ons-pull-hook: Fix [#1444](https://github.com/OnsenUI/OnsenUI/issues/1444).

v2.0.0-rc.9
----
 * ons-popover: Fix iOS glitch.
 * ons-fab: Fix issue where element was not shown correctly in React.

v2.0.0-rc.8
----
 * core: Fixed [#845](https://github.com/OnsenUI/OnsenUI/issues/845).
 * ons-pull-hook: Add React compatibility.

v2.0.0-rc.7
----
 * ons-carousel: Support ng-repeat in Angular1 bindings.
 * ons-carousel: Fix [#1168](https://github.com/OnsenUI/OnsenUI/issues/1168).
 * ons-switch: Trigger `change` event only once.
 * ons-bottom-toolbar: Correctly register element. Fix [#1426](https://github.com/OnsenUI/OnsenUI/issues/1426).
 * ons-pull-hook: Fix [#1415](https://github.com/OnsenUI/OnsenUI/issues/1415).
 * ons-navigator: Add `onDeviceBackButton` property.
 * ons-fab: Show button by default.

v2.0.0-rc.6
----
 * ons-page: Change to fill page background element if there is only .page__content element in ons-page.
 * ons-splitter: 'load' methods return promises in Angular1 bindings.
 * ons-navigator: Fix 'popPage' with 'refresh' parameter.
 * ons-dialog: Make ons-dialog angular2 compatible.
 * ons-speed-dial, ons-speed-dial-item: Removed `_compiled` attribute.
 * ons-speed-dial: Make ons-speed-dial elements angular2 compatible.
 * ons-carousel: Fix [#1423](https://github.com/OnsenUI/OnsenUI/issues/1423).
 * core: Create unified `onDeviceBackButton` API for alert-dialog, dialog, modal, page, popover, splitter.

v2.0.0-rc.5
----
 * ons-dialog: Make ons-dialog angular2 compatible.
 * ons-speed-dial, ons-speed-dial-item: Removed "_compiled" attribute.
 * ons-speed-dial: Make ons-speed-dial elements angular2 compatible.
 * css-components: Fix material list item paddings.
 * ons-list: Fix [#1401](https://github.com/OnsenUI/OnsenUI/issues/1401).
 * ons-range: Fix [#1391](https://github.com/OnsenUI/OnsenUI/issues/1391).
 * ons-carousel: Fix [#1404](https://github.com/OnsenUI/OnsenUI/issues/1404).
 * ons-speed-dial: Add `isOpen()` method.
 * ons-speed-dial: Emit `open` and `close` events.
 * ons-speed-dial: Block clicks when hidden.
 * ons-splitter: Correctly import dependency.
 * css-components: Fix border of inline list.
 * css-components: Refine style of list item title and subtitle.
 * ons-toolbar: Fix [#1419](https://github.com/OnsenUI/OnsenUI/issues/1419).
 * css-components: Refine default paddings of list items.
 * ons-back-button: Add `onClick` property.

v2.0.0-rc.4
----
 * ons-input: Fix to `input-id` attribute.

v2.0.0-rc.3
----
 * core: Support creation with `document.createElement` for several components.
 * ons-navigator: Support changing the `animation` attribute dynamically.
 * ons-dialog: Support changing the `animation` attribute dynamically.
 * ons-alert-dialog: Support changing the `animation` attribute dynamically.
 * ons-popover: Fix shadow glitch.

v2.0.0-rc.2
----
 * ons-tab: Fix dynamic `icon` and `label` attributes.

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

v1.3.17
----
* ons-tabbar: Remove previous page when using `loadPage()`.

v1.3.16
----
* ons-pull-hook: Fix flickering in iOS.

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
