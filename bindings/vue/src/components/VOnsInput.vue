<template>
  <ons-input v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-input>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-input';
  import { deriveEvents, modelInput, modifier } from '../mixins';

  export default {
    name: 'v-ons-input',
    mixins: [deriveEvents, modelInput, modifier]
  };
</script>