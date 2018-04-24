<template>
  <ons-splitter-content v-on="unrecognizedListeners">
    <slot></slot>
  </ons-splitter-content>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-splitter-content';
  import { deriveEvents } from '../mixins';

  export default {
    name: 'v-ons-splitter-content',
    mixins: [deriveEvents]
  };
</script>