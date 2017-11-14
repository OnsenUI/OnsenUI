
CHANGELOG
====

dev
----

### New Features

* Supported Onsen UI Core 2.8.x.

### Misc

 * Reduced bundle size by more than 50%! (react-onsenui.min.js)

### BREAKING CHANGES

 * `prop-types` package is not bundled anymore in `react-onsenui.js`. This shouldn't affect ES2015 environments since it became a direct dependency. However, this file should not be included directly in browsers anymore. Use `react-onsenui.min.js` instead (production ready).

1.8.0
----

### New Features

* Supported Onsen UI Core 2.7.x.

1.7.0
----

### New Features

* Modal: Updated API to match other dialogs. `onPreShow`, `onPreHide`, `onPostShow` and `onPostHide` hooks are now available. It can still be rendered in Page's `renderModal` function or directly as a child component like any other dialog.

### Bug Fixes

* Modal: It is now placed outside pages and can properly fill iOS status bar.
* Select: 'onChange' is called only once.
* Select: 'value' prop correctly sets the initial selected option.

### Misc

* Non string props are not passed as attributes anymore in order to clean up DOM elements.

### BREAKING CHANGES

* Modal: `onHide` and `onShow` hooks are renamed to `onPostHide` and `onPostShow`.

1.6.1
----

### Bug Fixes

* Navigator: Regression issue. Properly update child pages.

1.6.0
----

### New Features

* segment: Added new component.
* Components now update back button handler when prop changes.
* PullHook: Added `onPull` prop.
* PullHook: `onLoad` prop can be updated.
* Tabbar: Support for swiping feature. Added `swipeable` and `onSwipe` props.

### Bug Fixes

* Tabbar: `index` was trying to set active tab twice.
* Navigator: Avoid rendering pages twice.

### BREAKING CHANGES

* SplitterSide: 'isSwipeable' prop has been renamed to 'swipeable'.
* Tabbar: `index` must be updated during `onPostChange` instead of `onPreChange`.

1.5.0
----

### New Features

* navigator, router-navigator: Support iOS "swipe-to-pop".

### Misc

* Provide minified version.
* alert-dialog-button: Added new component.

v1.4.0
----

### BREAKING CHANGES

 * Input: It has been split into different components: `Input` for text types; `Checkbox` for checkboxes; `Radio` for radio buttons; and `SearchInput` for styled search inputs.
     * `<Input type='radio' checked={...} />` => `<Radio checked={...} />`

v1.3.4
----

### Bug Fixes

 * Removed unresolved `require` in `react-onsenui.js` caused by `webpack.definePlugin`. Fixed [#2034](https://github.com/OnsenUI/OnsenUI/issues/2034).

v1.3.3
----

### Bug Fixes

 * Updated `prop-types` to fix [facebook/prop-types#38](https://github.com/facebook/prop-types/issues/38).

v1.3.2
----

### Misc

 * Remove `module` property from `package.json` temporarily.

v1.3.1
----

### Bug Fixes

* card: Use `PropTypes` in `prop-types` instead of `React.PropTypes`.

v1.3.0
----

### New Features

* action-sheet: Added new component.
* toast: Added new component.
* card: Added new component.
* list-title: Added new component.
* `react-onsenui` is now available as ES Modules.

### Bug Fixes

* input: Added initial date value support.

### Misc

* Added `onsenui@~2.3.0` into `peerDependencies`.
* Build `react-onsenui.js` with webpack 2 instead of Rollup.

v1.2.0
----
* Fixed [#1768](https://github.com/OnsenUI/OnsenUI/pull/1768).
* router-navigator: Fixed [#1822](https://github.com/OnsenUI/OnsenUI/pull/1822).
* lazy-list: Support for dynamic heights.
* select: Added new component.
* dialogs: Fixed [#1758](https://github.com/OnsenUI/OnsenUI/pull/1758).
* components: Added onDeviceBackButton handler prop.
* navigator: Fixed support for Device Back Button.
* router-navigator: Fixed support for Device Back Button.

v1.1.0
----
* router-navigator: Add stateless Navigator

v1.0.1
----
* list: Support static lists.
* navigator: Properly render pages.

v1.0.0
----

v0.7.4
----
* modal: Fix hide and show logic.
* carousel: Refresh carousel when number of children changes.

v0.7.2
----
* tabbar: Fix regression.

v0.7.1
----
* navigator: add routes to events

v0.7.0
----
* tabbar: New interface with index.
* page: Fixed bug with modifier not being applied to pages. Add contentStyle property.
* page: Add `renderFixed` prop to render fixed position conent.
* range: Fix `value` prop.

