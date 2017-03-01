<template>
  <ons-speed-dial>
    <slot></slot>
  </ons-speed-dial>
</template>

<script>
  import { hidable, deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents, hidable],

    props: {
      open: {
        type: Boolean,
        default: undefined
      }
    },

    methods: {
      action() {
        this._shouldUpdate() && this.$el[this.open ? 'showItems' : 'hideItems'].call(this.$el);
      },
      _shouldUpdate() {
        return this.open !== undefined && this.open !== this.$el.isOpen();
      }
    },

    watch: {
      open() {
        this.action();
      }
    },

    mounted() {
      this.$on(['open', 'close'], () => this._shouldUpdate() && this.$emit('toggle', this.$el.isOpen()));

      this.action();
    }
  };
</script>
