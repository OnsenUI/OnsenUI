<!--
Guidelines:
 * Release dates should be in UTC.
    * They can be retrieved from `npm info <package-name>`.
-->

CHANGELOG
====

2.0.0-alpha.0 (Work In Progress)
----

### Features
 * Make `v-ons-switch` component compatible with Vue.js 2.x.
 * Add `v-ons-range` component.

<!--
### Bug Fixes
 * 

### PEER-DEPENDENCY UPDATES
 * 
-->

### BREAKING CHANGES
 * Stop exposing Vue.js component options objects.
 * Obsolete the plugin option `components`.
   * It should not be able to select which components will be registered.
 * Make `install` register all the components of vue-onsenui.
 * Rename the component names from `ons-*` to `v-ons-*` due to the spec of Vue.js 2.

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
