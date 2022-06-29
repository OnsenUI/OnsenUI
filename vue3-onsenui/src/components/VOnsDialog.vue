<template>
  <ons-dialog :modifier="normalizedModifier" v-bind="orderedProps">
    <slot></slot>
  </ons-dialog>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-dialog.js';
  import { deriveEvents, hasOptions, dialog, deriveDBB, portal, modifier } from '../mixins/index.js';

  const name = 'v-ons-dialog';

  export default {
    name,
    mixins: [deriveEvents(name), hasOptions, dialog, deriveDBB, portal, modifier]
  };
</script>
