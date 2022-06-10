<template>
  <ons-action-sheet :modifier="normalizedModifier">
    <slot></slot>
  </ons-action-sheet>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-action-sheet.js';
  import { deriveEvents, hasOptions, dialogCancel, deriveDBB, portal, modifier } from '../mixins/index.js';

  const name = 'v-ons-action-sheet';

  export default {
    name,
    mixins: [deriveEvents(name), hasOptions, dialogCancel, deriveDBB, portal, modifier]
  };
</script>
