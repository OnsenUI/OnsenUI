<template>
  <ons-carousel-item v-on="unrecognizedListeners">
    <slot></slot>
  </ons-carousel-item>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-carousel-item';
  import { deriveEvents } from '../mixins';

  export default {
    name: 'v-ons-carousel-item',
    mixins: [deriveEvents]
  };
</script>