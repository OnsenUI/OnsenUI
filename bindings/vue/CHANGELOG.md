CHANGELOG
====

2.1.1
----

### Bug Fixes

* VOnsNavigator: Keep page scroll during pop animation.

### Misc

* Avoid CE check in production.
* Removed 'modifier' patches. Requires at least `onsenui@2.5.3`.

2.1.0
----

### New Features

* VOnsNavigator: Supports iOS "swipe-to-pop" feature.
* Components pass unrecognized listeners to the inner Custom Element (without modifiers). This allows listeners like `@click` or `@input` to be used without `native` modifier. E.g. `<v-ons-card @click="...">`.
* VOnsNavigator: Passes unrecognized listeners to its redered pages. This allows declaring custom actions via events with a syntax like `<v-ons-navigator :page-stack="pageStack" @push="pageStack = [...pageStack, $event]"></v-ons-navigator>`. Note that it has no children (with `v-for`) since there is no need to pass `pageStack` prop down anymore. The old syntax is also supported.

### Bug Fixes

* VOnsSplitterSide: Keep `index` prop synced when changing modes (portrait/landscape).

### Misc

* Supports (and requires) `vue@2.4.0`. Some inner v-for keys have been modified.
* VOnsAlertDialogButton: New component.

2.0.2
----

### Misc

* Provide minified version and separate source maps.

2.0.1
----

### Misc

* Reduced 'click' events registered in Vue dev tools.

2.0.0
----

2.0.0-rc.0
----

### New Features

* Support for `v-model` in every input. As of `vue@2.3`, it does not support modifiers for custom components.
* VOnsInput, VOnsRange: Added `modelEvent` prop to change the bound event name for `v-model`: `<v-ons-input v-model="something" model-event="change">` becomes a "lazy" model bound on `change` instead of `input` event.
* VOnsTabbar: `tabs` prop now accepts a `props` property for each tab that allows passing props to the corresponding page.

### BREAKING CHANGES

* VOnsInput: It has been split into different components: `VOnsInput` for text types; `VOnsCheckbox` for checkboxes; `VOnsRadio` for radio buttons; and `VOnsSearchInput` for styled search inputs.
    * `<v-ons-input type="radio" checked>` => `<v-ons-radio checked>`

* VOnsModel: This directive has been removed in favor of `v-model`.
    * `v-ons-model` => `v-model`

2.0.0-beta.8
----

### Bug Fixes

* VOnsModel: Arrays are now replaced instead of mutated.
* VOnsNavigator: Fixed auto scroll top issue when popping pages.

2.0.0-beta.7
----

### New Features

* VOnsModel: Supports object literal syntax `v-ons-model="{ container: myArray, key: myIndex }"`. This is useful inside `v-for` loops.

2.0.0-beta.6
----

### Bug Fixes

* Updated `onsenui` in `peerDependencies` to `~2.3.0`.

2.0.0-beta.5
----

### New features

* VOnsCard: New component.
* VOnsToast: New component.
* VOnsListTitle: New component.
* VOnsActionSheet: New component.
* VOnsActionSheetButton: New component.
* $ons.openActionSheet: Suppot shortcut method for VOnsActionSheet.
* $ons.notification.toast: Suppot shortcut method for VOnsToast.

2.0.0-beta.4
----

### New Features

* Vue 2.3.0: `sync` modifier is now supported for `index`, `visible` and `open` props. See breaking changes section.

### Bug Fixes

* VOnsSelect: Fixed VOnsModel update.

### BREAKING CHANGES

* Renamed `update` events: Dialogs, VOnsTabbar, VOnsCarousel, VOnsSpeedDial and VOnsSplitterSide used to throw an `update` event that was used to change `index`, `visible` or `open` props.
    * This event has been renamed to match the prop name (`update:index`, `update:visible` and `update:open`), thus making it compatible with `sync` modifier.
    * As a result, `:visible="isShown" @update="isShown = $event"` becomes => `:visible.sync="isShown"`.

2.0.0-beta.3
----

### Bug Fixes

* Dialogs: Fix portal feature that made inputs lose focus in dialogs.

2.0.0-beta.2
----

### New Features

* Dialogs: Implement 'portal' functionality.
* VOnsModel: Supports dot notation 'container.value'.

2.0.0-beta.1
----

### Bug Fixes

* VOnsNavigator: Options object is not modified anymore.
* VOnsNavigator: Fix support for Vue router.
* Events: Fixed deriving events from the core.

2.0.0-beta.0
----

### Bug Fixes

* Autostyling: Fix for 'material' modifier.
* VOnsNavigator: Added `popPage` optional prop.
* VOnsTabbar: Fix update issue.
* VOnsCarousel: Fix update issue.
* VOnsLazyRepeat: Destroys previous provider.
* Components destruction is delayed in order to support animations.

2.0.0-alpha.1
----

### New Features

* VOnsInput: Checkbox supports both Array and Boolean type in VOnsModel.
* VOnsSwitch: Behaves like VOnsCheckbox for VOnsModel.
* VOnsSelect: Supports Array type in VOnsModel.
* VOnsLazyRepeat: Implemented Lazy Repeat component.
* $ons: Expose `$ons` object in Vue prototype (`vm.$ons`).
* VOnsSplitterSide: API refactor. Uses optional `open` prop and `update` event.
* VOnsSpeedDial: API refactor. Uses optional `open` prop and `update` event.
* VOnsCarousel: API refactor. Uses optional `index` prop and `update` event.
* VOnsTabbar: API refactor. Uses optional `index` prop and `update` event.
* VOnsTabbar: Supports `tabs` prop and it is preferred over slots.
* VOnsBackButton: It does not require props anymore. Implemented default behavior (pop 1 page) that can be avoided with `@click.prevent="..."`.
* Device Back Button handlers extend the Core default behavior and can be overriden with `@deviceBackButton.prevent="..."`.

### Bug Fixes and Perf

* Modifiers are now correctly applied.
* Removed incompatible function calls (`includes`).
* Removed getters from Vue prototype. Added Inject/Provide functionality instead to support Vue 2.2.0.
* Improved performance by making `onInfiniteScroll` prop optional.
* Device Back Button handler works with `<keep-alive>`.
* Fixed a possible namespace issue when nesting VOnsCarousel in VOnsTabbar and using `postchange` event.

### Misc

* Warnings are now shown in development mode when Custom Elements (i.e. `<ons-*>`) are found in Vue templates.
* Improved overall performance and reduced lib size.

### BREAKING CHANGES

* Deprecated Methods API (Core-like API).
* Deprecated VOnsOpen directive.
* Deprecated VOnsIndex directive.
* Removed `$notification` and `$platform` in favor of `$ons.notification` and `$ons.platform`.
* VOnsPullHook: `action` is now a prop, not an event (`@action` => `:action`).
* VOnsPage: `infiniteScroll` is now a prop, not an event (`@infiniteScroll` => `:infinite-scroll`).
* VOnsNavigator: It now requires a `pageStack` prop. Including direct children is now optional.
* VOnsBackButton, VOnsTab, VOnsSpeedDial: Removed all `onClick` props. Overriding the default click behavior can now be done with a more natural `@click.prevent`.
* VOnsAlertDialog: It does not magically apply `.alert-dialog-button` to buttons included in `slot="footer"` anymore (`footer` prop is preferred).

2.0.0-alpha.0
----

Initial release of v2 bindings. Apps made with v1 are not compatible.

1.0.0 (2016-09-15)
----

0.1.3 (2016-08-31)
----

0.1.2 (2016-08-26)
----

0.1.1 (2016-08-25)
----

0.1.0 (2016-08-25)
----
