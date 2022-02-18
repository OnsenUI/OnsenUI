<template>
  <ons-dialog v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-dialog>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-dialog';
  import { deriveEvents, hidable, hasOptions, dialogCancel, deriveDBB, portal, modifier } from '../mixins';

  export default {
    name: 'v-ons-dialog',
    mixins: [deriveEvents, hidable, hasOptions, dialogCancel, deriveDBB, portal, modifier]
  };
</script>