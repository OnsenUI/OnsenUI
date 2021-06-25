<template>
  <ons-toolbar v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-toolbar>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-toolbar';
  import { deriveEvents, hidable, modifier } from '../mixins';

  export default {
    name: 'v-ons-toolbar',
    mixins: [deriveEvents, hidable, modifier]
  };
</script>