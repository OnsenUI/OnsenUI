<template>
  <ons-radio v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-radio>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-radio';
  import { deriveEvents, modelRadio, modifier } from '../mixins';

  export default {
    name: 'v-ons-radio',
    mixins: [deriveEvents, modelRadio, modifier]
  };
</script>