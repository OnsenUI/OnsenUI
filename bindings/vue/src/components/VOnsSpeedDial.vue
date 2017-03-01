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
      _action() {
        if (this.open !== undefined && this.open !== this.$el.isOpen()) {
          this.$el[this.open ? 'showItems' : 'hideItems'].call(this.$el);
        }
      }
    },

    watch: {
      open: function() {
        this._action();
      }
    },

    mounted() {
      this.$on(['open', 'close'], event => {
        if (this.open !== undefined && this.open !== this.$el.isOpen()) {
          this.$emit('toggle', event.target.isOpen());
        }
      });

      this._action();
    }
  };
</script>
