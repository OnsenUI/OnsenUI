<template>
  <ons-bottom-toolbar v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-bottom-toolbar>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-bottom-toolbar';
  import { deriveEvents, modifier } from '../mixins';

  export default {
    name: 'v-ons-bottom-toolbar',
    mixins: [deriveEvents, modifier]
  };
</script>