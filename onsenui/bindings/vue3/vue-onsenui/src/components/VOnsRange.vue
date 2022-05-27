<template>
  <ons-range v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-range>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-range';
  import { deriveEvents, modelInput, modifier } from '../mixins';

  export default {
    name: 'v-ons-range',
    mixins: [deriveEvents, modelInput, modifier]
  };
</script>