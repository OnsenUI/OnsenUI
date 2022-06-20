CHANGELOG
====

dev
---

 ### BREAKING CHANGES

 * The ESM build is now the default when vue-onsenui is used with a bundler. When using the ESM build, components must be registered using `app.component` before they can be used.
 * For v-model, `modelValue` prop and `update:modelValue` event are now used instead of `modelProp` prop and `modelEvent` event. However, the `modelEvent` *prop* is unchanged.
 * VOnsLazyRepeat: The renderItem prop should be a function that returns an *object* describing a Vue component.
 * VOnsCarousel: The `index` prop and `update:index` event have been renamed to `active-index` and `update:active-index` respectively.

 ### Bug Fixes

 * VOnsSplitterSide: animation option is respected when swiping splitter at startup.
 * VOnsPage: Page content is updated when adding content dynamically with `v-for`. [#2512](https://github.com/OnsenUI/OnsenUI/issues/2512)).
 * VOnsRange: Model value as a number instead of a string. [#2771](https://github.com/OnsenUI/OnsenUI/issues/2771).

Older changes
-------------
For older changes, see the vue-onsenui v2 CHANGELOG.
