<template>
  <ons-navigator>
    <slot></slot>
  </ons-navigator>
</template>

<script>
  import { deriveEvents, deriveMethods, deriveProperties } from '../internal/mixins/derive';
  import { VuePageLoader } from '../internal/mixins/pageLoader';

  export default {
    mixins: [deriveEvents, deriveMethods, deriveProperties, VuePageLoader]
  };
</script>
