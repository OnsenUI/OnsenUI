<template>
  <ons-carousel
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
  import 'onsenui/esm/elements/ons-carousel';
  import { hasOptions, deriveEvents } from '../mixins';

  export default {
    name: 'v-ons-carousel',
    mixins: [hasOptions, deriveEvents],

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
