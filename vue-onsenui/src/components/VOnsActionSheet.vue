<template>
  <ons-action-sheet v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-action-sheet>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-action-sheet';
  import { deriveEvents, hasOptions, dialogCancel, deriveDBB, portal, modifier } from '../mixins';

  export default {
    name: 'v-ons-action-sheet',
    mixins: [deriveEvents, hasOptions, dialogCancel, deriveDBB, portal, modifier]
  };
</script>
