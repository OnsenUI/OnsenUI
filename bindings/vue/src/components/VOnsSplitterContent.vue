<template>
  <ons-splitter-content>
    <slot></slot>
  </ons-splitter-content>
</template>

<script>
  import { deriveMethods } from '../internal/mixins/derive';
  import { VuePageLoader } from '../internal/mixins/pageLoader';

  export default {
    mixins: [deriveMethods, VuePageLoader]
  };
</script>
