<template>
  <ons-page
    :modifier="normalizedModifier"
  >
    <slot></slot>
  </ons-page>
</template>

<script>
  import 'onsenui/esm/elements/ons-page';
  import { deriveEvents, deriveDBB, modifier } from '../mixins';

  const name = 'v-ons-page';

  export default {
    name,
    mixins: [deriveEvents(name), deriveDBB, modifier],

    props: {
      infiniteScroll: {
        type: Function
      }
    },

    mounted() {
      this.$el.onInfiniteScroll = this.infiniteScroll;
    },

    watch: {
      infiniteScroll() {
        if (this.$el.onInfiniteScroll !== this.infiniteScroll) {
          this.$el.onInfiniteScroll = this.infiniteScroll;
        }
      }
    }
  };
</script>
