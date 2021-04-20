<template>
  <ons-col v-on="unrecognizedListeners">
    <slot></slot>
  </ons-col>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-col';
  import { deriveEvents } from '../mixins';

  export default {
    name: 'v-ons-col',
    mixins: [deriveEvents]
  };
</script>