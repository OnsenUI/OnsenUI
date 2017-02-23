<template>
  <ons-speed-dial>
    <slot></slot>
  </ons-speed-dial>
</template>

<script>
  import { fabAPI, deriveEvents, deriveMethods, deriveProperties } from '../mixins';

  export default {
    mixins: [deriveEvents, deriveMethods, deriveProperties, fabAPI],

    props: {
      open: {
        type: Boolean
      }
    },

    watch: {
      open: function() {
        if (this.open !== this.$el.isOpen()) {
          this.$el[this.open ? 'showItems' : 'hideItems'].call(this.$el);
        }
      }
    },

    mounted() {
      this.$nextTick(() => {
        if (this.open !== this.$el.isOpen()) {
          this.$el[this.open ? 'showItems' : 'hideItems'].call(this.$el);
        }
      });
    }
  };
</script>
