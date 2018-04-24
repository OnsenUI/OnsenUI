<template>
  <ons-modal v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-modal>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-modal';
  import { deriveEvents, hidable, hasOptions, deriveDBB, portal, modifier } from '../mixins';

  export default {
    name: 'v-ons-modal',
    mixins: [deriveEvents, hidable, hasOptions, deriveDBB, portal, modifier]
  };
</script>