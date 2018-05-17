<template>
  <ons-fab v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-fab>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-fab';
  import { deriveEvents, hidable, modifier } from '../mixins';

  export default {
    name: 'v-ons-fab',
    mixins: [deriveEvents, hidable, modifier]
  };
</script>