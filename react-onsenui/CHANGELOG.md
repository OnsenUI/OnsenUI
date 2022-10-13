
CHANGELOG
====

1.13.1
---
### New Features
* ListItem: Add `keepTapBackgroundColor` property ([#2626](https://github.com/OnsenUI/OnsenUI/issues/2626)).

1.13.0
---

### New Features

 * Support React 18.

### Bug Fixes

 * Input, SearchInput: Fix value prop being ignored after input is touched. ([#2996](https://github.com/OnsenUI/OnsenUI/issues/2996)).

1.12.0
---

### BREAKING CHANGES

 * Setting BackButton's `onClick` prop no longer prevents default behaviour. Use `event.preventDefault()` in the `onClick` handler to prevent default behaviour.
 * AlertDialogs are no longer cancelable by default. Set the `cancelable` prop to make an alert dialog cancelable.

### New Features

 * Support React 17. ([#2851](https://github.com/OnsenUI/OnsenUI/issues/2851))
 * Support Onsen UI 2.12.0.
 * ListItem: Added `animation` prop.
 * ListItem: Added `onExpand` prop.
 * BackButton: Added `options` prop.
 * ActionSheet: Added `title` prop.
 * Toolbar: Added `inline` and `static` props.
 * ToolbarButton: Added `onClick` and `icon` props.
 * Carousel: Added `onPreChange` and `animation` props.
 * Ripple: Added `modifier`, `size` and `center` props.
 * Segment: Added `disabled` prop.
 * Tabbar: Added `modifier` prop.
 * Tab: Added `icon`, `activeIcon`, `label` and `badge` props.
 * Input: Added `onInput` prop.
 * SearchInput: Added `readOnly`, `defaultValue`, `onInput` and `placeholder` props.
 * Checkbox: Added `onInput` prop.
 * Switch: Added `modifier` and `defaultChecked` props.
 * Radio: Added `name` prop.
 * Range: Added `defaultValue` and `onInput` props.
 * Allow arbitrary events by setting a prop `on<EventName>` e.g. `onKeyup`. ([#2959](https://github.com/OnsenUI/OnsenUI/issues/2959)).

### Bug Fixes

 * Components now forward refs properly to the inner Custom Element. ([#2959](https://github.com/OnsenUI/OnsenUI/issues/2959)).
 * Removed all references to deprecated `ReactDOM.findDOMNode`. ([#2822](https://github.com/OnsenUI/OnsenUI/issues/2822)).
 * Removed all unsafe lifecycle methods. ([#2680](https://github.com/OnsenUI/OnsenUI/issues/2680)).
 * Carousel: Allow only PropTypes.string for itemWidth and itemHeight.
 * Tabbar: `ignoreEdgeWidth` prop type is now `number`.
 * Input, SearchInput, Checkbox, Switch: `onChange` is no longer triggered by the `input` event.
 * Input, SearchInput, Checkbox, Switch: Camel-cased props are now recognised for known input attributes (e.g. `readOnly`). ([#2570](https://github.com/OnsenUI/OnsenUI/issues/2570)).
 * Select: `size` prop type is now `number`. ([#2526](https://github.com/OnsenUI/OnsenUI/issues/2526)).
 * SplitterSide: `swipeTargetWidth` prop type is now number.
 * SplitterSide: `width` prop type is now string.
 * SplitterSide: Removed `mode` prop.
 * SplitterSide: Stop error being thrown when `animationOptions` prop is set. ([#2494](https://github.com/OnsenUI/OnsenUI/issues/2494)).
 * Navigator, RouterNavigator: Pass `animationOptions` properly. ([#2705](https://github.com/OnsenUI/OnsenUI/issues/2705)).
 * Select: Stop first option getting lost when Select is a direct child of ListItem. ([#2560](https://github.com/OnsenUI/OnsenUI/issues/2560)).

### Misc

 * AlertDialog: `onCancel`, `isOpen`, `isDisabled` and `isCancelable` are deprecated and renamed to `onDialogCancel`, `visible`, `disabled`, and `cancelable`.
 * AlertDialog: `isOpen` is no longer required.
 * Dialog: `onCancel`, `isOpen`, `isDisabled` and `isCancelable` are deprecated and renamed to `onDialogCancel`, `visible`, `disabled`, and `cancelable`.
 * Dialog: `isOpen` is no longer required.
 * Toast: `isOpen` is deprecated and renamed to `visible`.
 * Toast: `isOpen` is no longer required.
 * Modal: `isOpen` is deprecated and renamed to `visible`.
 * ActionSheet: `onCancel`, `isOpen`, `isDisabled` and `isCancelable` are deprecated and renamed to `onDialogCancel`, `visible`, `disabled`, and `cancelable`.
 * ActionSheet: `isOpen` is no longer required.
 * Carousel: `index` is deprecated and renamed to `activeIndex`.
 * PullHook: `onLoad` and `onChange` are deprecated and renamed to `onAction` and `onChangeState`.
 * Segment: `index` is deprecated and renamed to `activeIndex`.
 * Tabbar: `index` and `visible` are deprecated and renamed to `activeIndex` and `hideTabs`.
 * Tabbar: `index` is no longer required.
 * SplitterSide: `onOpen` and `onClose` are deprecated and renamed to `onPostOpen` and `onPostClose`.
 * Popover: `isDisabled`, `isCancelable` and `onCancel` are deprecated and renamed to `disabled`, `cancelable` and `onDialogCancel`.

1.11.5
----

### Misc

 * Bump non-breaking vulnerable dependencies, including all production vulnerabilities.

1.11.4
----

### Misc

 * Depend on OnsenUI ~v2.11.0.
 * UIWebView is no longer supported.

1.11.3
----

### New Features

  * GestureDetector: Added new component to wrap ons-gesture-detector.

### Bug Fixes

  * ListItem: Set expanded on inner list item at startup. ([#2499](https://github.com/OnsenUI/OnsenUI/issues/2499))

1.11.2
----

### New Features

  * Toolbar: Add visible prop to show and hide toolbar

### Bug Fixes

  * RouterNavigator: Fix double mount ([#2423](https://github.com/OnsenUI/OnsenUI/issues/2423))
  * Checkbox: Fix checkbox behaviour on multi-mount ([#2418](https://github.com/OnsenUI/OnsenUI/issues/2418))

### Misc

  * Depend on React 16
  * Remove auto-generated docs

1.11.1
----

### Misc

  * Depend on OnsenUI ~v2.10.0

1.11.0
----

### New Features

  * Tabbar: Add `visible` prop to allow showing / hiding
  * ListItem: Add support for expandable items
  * Inputs: Add defaultValue props, to enable use as [uncontrolled components](https://reactjs.org/docs/uncontrolled-components.html) (PR [#2309](https://github.com/OnsenUI/OnsenUI/pull/2309))

### Bug Fixes

  * Input: Fix readOnly prop ([#2323](https://github.com/OnsenUI/OnsenUI/issues/2323))
  * Input: Update class correctly when className is changed ([#2158](https://github.com/OnsenUI/OnsenUI/issues/2158))

1.10.0
----

### New Features

  * Support Onsen UI Core 2.9.x.
  * Page: Added 'onInfiniteScroll' prop.

1.9.0
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

