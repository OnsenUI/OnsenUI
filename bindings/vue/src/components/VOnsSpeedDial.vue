<template>
  <ons-speed-dial>
    <slot></slot>
  </ons-speed-dial>
</template>

<script>
  import { deriveEvents, deriveMethods, deriveProperties } from '../internal/mixins/derive';
  import { fabAPI } from '../internal/mixins/api';

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
