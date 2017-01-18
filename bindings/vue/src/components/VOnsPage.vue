<template>
  <ons-page>
    <slot></slot>
  </ons-page>
</template>

<script>
  import { deriveEvents, deriveProperties } from '../internal/mixins.js';

  export default {
    mixins: [deriveEvents, deriveProperties]
  };
</script>
