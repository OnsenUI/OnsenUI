<template>
  <ons-tab>
  </ons-tab>
</template>

<script>
  import { VuePageLoader } from '../internal/mixins/pageLoader';

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
