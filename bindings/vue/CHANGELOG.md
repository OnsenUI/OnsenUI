CHANGELOG
====

dev
----

### Bug fixes

* VOnsNavigator: Options object is not modified anymore.
* VOnsNavigator: Fix support for Vue router.
* Events: Fixed deriving events from the core.

2.0.0-beta.0
----

### Bug fixes

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

### Bug fixes and perf

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
