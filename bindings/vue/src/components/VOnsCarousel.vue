<template>
  <ons-carousel>
    <slot></slot>
  </ons-carousel>
</template>

<script>
  import { deriveEvents, deriveMethods, deriveProperties } from '../internal/mixins.js';

  export default {
    mixins: [deriveEvents, deriveMethods, deriveProperties]
  };
</script>
