<template>
  <ons-progress-circular v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-progress-circular>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-progress-circular';
  import { deriveEvents, modifier } from '../mixins';

  export default {
    name: 'v-ons-progress-circular',
    mixins: [deriveEvents, modifier]
  };
</script>