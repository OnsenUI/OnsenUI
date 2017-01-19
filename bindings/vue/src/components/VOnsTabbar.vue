<template>
  <ons-tabbar>
    <slot></slot>
  </ons-tabbar>
</template>

<script>
  import { deriveEvents, deriveMethods, deriveProperties } from '../internal/mixins/derive';

  export default {
    mixins: [deriveEvents, deriveMethods, deriveProperties]
  };
</script>
