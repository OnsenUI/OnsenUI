<template>
  <ons-carousel
    :on-swipe.prop="onSwipe"
    :initial-index="index"
    @postchange.self="$emit('update:index', $event.activeIndex)"
    v-on="unrecognizedListeners"
  >
    <div>
      <slot></slot>
    </div>
    <div></div>
  </ons-carousel>
</template>

<script>
  import 'onsenui/core-src/elements/ons-carousel';
  import { hasOptions, deriveEvents } from '../mixins';

  export default {
    mixins: [hasOptions, deriveEvents],

    props: {
      index: {
        type: Number
      },
      onSwipe: {
        type: Function
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
