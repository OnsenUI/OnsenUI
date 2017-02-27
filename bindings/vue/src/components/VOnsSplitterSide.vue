<template>
  <ons-splitter-side :swipeable="!!swipeable">
    <slot></slot>
  </ons-splitter-side>
</template>

<script>
  import { destroyable, hasOptions, deriveEvents, deriveProperties } from '../mixins';

  export default {
    mixins: [destroyable, hasOptions, deriveEvents, deriveProperties],

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

    methods: {
      _action() {
        this.$el[this.open ? 'open' : 'close'].call(this.$el, this.options);
      }
    },

    watch: {
      open() {
        this._action();
      }
    },

    mounted() {
      this.$on('swipeEnd', shouldOpen => {
        if (this.open !== shouldOpen) {
          return this.swipeable(shouldOpen);
        }
        if (this.open !== this.$el.isOpen) {
          this._action();
        }
      });

      this.splitter.$on('mask', () => this.swipeable && this.swipeable(false));

      this.$nextTick(() => {
        if (this.open !== this.$el.isOpen) {
          this._action();
        }
      });
    }
  };
</script>
