<template>
  <ons-splitter-side>
    <slot></slot>
  </ons-splitter-side>
</template>

<script>
  import { deriveEvents, deriveMethods, deriveProperties, VuePageLoader } from '../internal/mixins.js';

  export default {
    mixins: [deriveEvents, deriveMethods, deriveProperties, VuePageLoader]
  };
</script>
