<template>
  <ons-carousel :initial-index="index">
    <slot></slot>
  </ons-carousel>
</template>

<script>
  import { hasOptions, deriveEvents, deriveProperties } from '../mixins';

  export default {
    mixins: [hasOptions, deriveEvents, deriveProperties],

    props: {
      index: {
        type: Number
      }
    },

    watch: {
      index() {
        if (this.index !== this.$el.getActiveIndex()) {
          this.$el.setActiveIndex(this.index, this.options);
        }
      }
    }
  };
</script>
