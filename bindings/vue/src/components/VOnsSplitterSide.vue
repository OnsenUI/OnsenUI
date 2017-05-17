<template>
  <ons-splitter-side>
    <slot></slot>
  </ons-splitter-side>
</template>

<script>
  import { hasOptions, deriveEvents } from '../mixins';

  export default {
    mixins: [hasOptions, deriveEvents],

    props: {
      open: {
        type: Boolean,
        default: undefined
      }
    },

    methods: {
      action() {
        this._shouldUpdate() && this.$el[this.open ? 'open' : 'close'].call(this.$el, this.options).catch(() => {});
      },
      _shouldUpdate() {
        return this.open !== undefined && this.open !== this.$el.isOpen;
      }
    },

    watch: {
      open() {
        this.action();
      }
    },

    mounted() {
      this.$on(['postopen', 'postclose'], () => this._shouldUpdate() && this.$emit('update:open', this.$el.isOpen));

      this.action();
    }
  };
</script>
