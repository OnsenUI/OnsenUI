<template>
  <ons-splitter-mask v-on="unrecognizedListeners">
    <slot></slot>
  </ons-splitter-mask>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-splitter-mask';
  import { deriveEvents } from '../mixins';

  export default {
    name: 'v-ons-splitter-mask',
    mixins: [deriveEvents]
  };
</script>