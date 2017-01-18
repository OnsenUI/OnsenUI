<template>
  <ons-splitter>
    <slot></slot>
  </ons-splitter>
</template>

<script>
  import { deriveProperties } from '../internal/mixins.js';

  export default {
    mixins: [deriveProperties]
  };
</script>
