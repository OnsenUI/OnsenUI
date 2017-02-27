<template>
  <ons-splitter-side :swipeable="!!swipeable">
    <slot></slot>
  </ons-splitter-side>
</template>

<script>
  import { destroyable, hasOptions, VuePageLoader, deriveEvents, deriveMethods, deriveProperties } from '../mixins';

  export default {
    mixins: [VuePageLoader, deriveEvents, deriveProperties],

    inject: ['splitter'],

    props: {
      open: {
        type: Boolean,
        required: true
      },

      swipeable: {
        type: Function
      }
    },

    watch: {
      open() {
        this.$el[this.open ? 'open' : 'close'].call(this.$el);
      }
    },

    mounted() {
      this.$on('swipeEnd', shouldOpen => {
        if (this.open !== shouldOpen) {
          return this.swipeable(shouldOpen);
        }
        if (this.open !== this.$el.isOpen) {
          this.$el[this.open ? 'open' : 'close'].call(this.$el);
        }
      });

      this.splitter.$on('mask', () => this.swipeable && this.swipeable(false));

      this.$nextTick(() => {
        if (this.open !== this.$el.isOpen) {
          this.$el[this.open ? 'open' : 'close'].call(this.$el);
        }
      });
    }
  };
</script>
