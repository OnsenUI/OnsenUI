<template>
  <ons-splitter>
    <slot></slot>
  </ons-splitter>
</template>

<script>
  import { deriveProperties } from '../internal/mixins/derive';

  export default {
    mixins: [deriveProperties]
  };
</script>
