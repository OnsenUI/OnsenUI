<template>
  <ons-splitter-side>
    <slot></slot>
  </ons-splitter-side>
</template>

<script>
  import { deriveEvents, deriveMethods, deriveProperties } from '../internal/mixins/derive';
  import { VuePageLoader } from '../internal/mixins/pageLoader';

  export default {
    mixins: [deriveEvents, deriveMethods, deriveProperties, VuePageLoader]
  };
</script>
