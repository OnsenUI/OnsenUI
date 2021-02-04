<template>
  <ons-progress-bar v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-progress-bar>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-progress-bar';
  import { deriveEvents, modifier } from '../mixins';

  export default {
    name: 'v-ons-progress-bar',
    mixins: [deriveEvents, modifier]
  };
</script>