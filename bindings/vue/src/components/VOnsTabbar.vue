<template>
  <ons-tabbar>
    <slot></slot>
  </ons-tabbar>
</template>

<script>
  import { deriveEvents, deriveMethods, deriveProperties } from '../common/optionsObjectHelper.js';

  export default {
    mixins: [deriveEvents, deriveMethods, deriveProperties]
  };
</script>
