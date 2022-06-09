<template>
  <ons-carousel-item>
    <slot></slot>
  </ons-carousel-item>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-carousel-item';
  import { deriveEvents } from '../mixins';

  const name = 'v-ons-carousel-item';

  export default {
    name,
    mixins: [deriveEvents(name)]
  };
</script>
