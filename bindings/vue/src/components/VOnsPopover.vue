<template>
  <ons-popover>
    <slot></slot>
  </ons-popover>
</template>

<script>
  import { deriveEvents, deriveMethods, deriveProperties } from '../internal/mixins/derive';

  export default {
    mixins: [deriveEvents, deriveMethods, deriveProperties],

    props: {
      shown: {
        type: Boolean
      },
      target: { }
    },

    computed: {
      targetSelector: function() {
        if (this.target && this.target._isVue) {
          return this.target.$el;
        }
        return this.target;
      }
    },

    watch: {
      shown: function() {
        if (this.shown !== this.visible) {
          this[this.shown ? 'show' : 'hide'].call(this, this.targetSelector);
        }
      }
    }
  };
</script>
