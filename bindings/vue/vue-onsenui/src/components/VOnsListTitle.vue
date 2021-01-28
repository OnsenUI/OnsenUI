<template>
  <ons-list-title v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-list-title>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-list-title';
  import { deriveEvents, modifier } from '../mixins';

  export default {
    name: 'v-ons-list-title',
    mixins: [deriveEvents, modifier]
  };
</script>