CHANGELOG
====

dev
---

 ### BREAKING CHANGES

 * The ESM build is now the default when vue-onsenui is used with a bundler. When using the ESM build, components must be registered using `app.component` before they can be used.
 * For v-model, `modelValue` prop and `update:modelValue` event are now used instead of `modelProp` prop and `modelEvent` event. However, the `modelEvent` *prop* is unchanged.
 * The `options.animation` and `options.animationOptions` props have been renamed to `animation` and `animationOptions` for all components.
 * VOnsCarousel, VOnsTabbar, VOnsSegment: The `index` prop and `update:index` event have been renamed to `activeIndex` and `update:activeIndex`.
 * VOnsLazyRepeat: The `renderItem` prop should be a function that returns an *object* describing a Vue component.
 * VOnsNavigator: The `pageStack` prop is no longer mutated directly. Instead use `v-model:pageStack` to keep the `pageStack` prop in sync.
 * VOnsNavigator: The `pageStack` prop no longer responds to array mutatation methods (e.g. Array.prototype.pop). The whole `pageStack` value must be replaced (e.g. by using Array.prototype.slice) to trigger a visual change.
 * VOnsNavigator: The `popPage` prop has been removed. Use `@deviceBackButton.prevent` and VOnsBackButton's `@click.prevent` to override default pop behaviour.
 * VOnsPopover: The `target` prop must be a Vue ref.

 ### Bug Fixes

 * VOnsSplitterSide: animation option is respected when swiping splitter at startup.
 * VOnsPage: Page content is updated when adding content dynamically with `v-for`. [#2512](https://github.com/OnsenUI/OnsenUI/issues/2512)).
 * VOnsRange: Model value as a number instead of a string. [#2771](https://github.com/OnsenUI/OnsenUI/issues/2771).

Older changes
-------------
For older changes, see the vue-onsenui v2 CHANGELOG.
