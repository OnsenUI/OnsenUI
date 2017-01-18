<template>
  <ons-splitter-content>
    <slot></slot>
  </ons-splitter-content>
</template>

<script>
  import { deriveMethods, VuePageLoader } from '../internal/mixins.js';

  export default {
    mixins: [deriveMethods, VuePageLoader]
  };
</script>
