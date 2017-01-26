<template>
  <ons-navigator>
    <slot></slot>
  </ons-navigator>
</template>

<script>
  import { deriveEvents, deriveMethods, deriveProperties, VuePageLoader } from '../internal/mixins.js';

  export default {
    mixins: [deriveEvents, deriveMethods, deriveProperties, VuePageLoader]
  };
</script>
