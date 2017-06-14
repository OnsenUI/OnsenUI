
CHANGELOG
====

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

