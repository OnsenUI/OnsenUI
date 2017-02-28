<template>
  <ons-splitter-side>
    <slot></slot>
  </ons-splitter-side>
</template>

<script>
  import { destroyable, hasOptions, deriveEvents, deriveProperties } from '../mixins';

  export default {
    mixins: [destroyable, hasOptions, deriveEvents, deriveProperties],

    props: {
      open: {
        type: Boolean,
        default: undefined
      }
    },

    methods: {
      _action() {
        if (this.open !== undefined && this.open !== this.$el.isOpen) {
          this.$el[this.open ? 'open' : 'close'].call(this.$el, this.options).catch(() => {});
        }
      }
    },

    watch: {
      open() {
        this._action();
      }
    },

    mounted() {
      this.$on(['postopen', 'postclose'], event => {
        if (this.open !== undefined && this.open !== event.target.isOpen) {
          this.$emit('swipe', event.target.isOpen)
        }
      });

      this._action();
    }
  };
</script>
