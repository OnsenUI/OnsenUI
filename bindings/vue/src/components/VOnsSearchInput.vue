<template>
  <ons-search-input v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-search-input>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-search-input';
  import { deriveEvents, modelInput, modifier } from '../mixins';

  export default {
    name: 'v-ons-search-input',
    mixins: [deriveEvents, modelInput, modifier]
  };
</script>