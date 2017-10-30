<template>
  <ons-carousel-item v-on="unrecognizedListeners">
    <slot></slot>
  </ons-carousel-item>
</template>

<script>
  import 'onsenui/core-src/elements/ons-carousel-item';
  import { deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents]
  };
</script>