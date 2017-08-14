<template>
  <ons-page v-on="unrecognizedListeners">
    <slot></slot>
  </ons-page>
</template>

<script>
  import { deriveEvents, deriveDBB, deriveHandler } from '../mixins';
  export default {
    mixins: [deriveEvents, deriveDBB, deriveHandler('onInfiniteScroll')],
    beforeDestroy() {
      this.$el._destroy();
    }
  };
</script>
