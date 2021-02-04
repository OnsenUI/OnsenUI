<template>
  <ons-ripple v-on="unrecognizedListeners">
    <slot></slot>
  </ons-ripple>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-ripple';
  import { deriveEvents } from '../mixins';

  export default {
    name: 'v-ons-ripple',
    mixins: [deriveEvents]
  };
</script>