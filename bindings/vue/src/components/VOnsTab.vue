<template>
  <ons-tab>
  </ons-tab>
</template>

<script>
  import { VuePageLoader } from '../internal/mixins.js';

  export default {
    mixins: [VuePageLoader],
    props: {
      page: {
        type: Object,
        required: true
      }
    }
  };
</script>
