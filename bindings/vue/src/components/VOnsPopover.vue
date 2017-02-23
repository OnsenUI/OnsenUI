<template>
  <ons-popover>
    <slot></slot>
  </ons-popover>
</template>

<script>
  import { dialogAPI, modifier, deriveEvents, deriveMethods, deriveProperties } from '../mixins';

  export default {
    mixins: [dialogAPI, modifier, deriveEvents, deriveMethods, deriveProperties],

    props: {
      target: {
        validator: function(value) {
          if (value._isVue || typeof value === 'string' || value instanceof Event || value instanceof HTMLElement) {
            return true;
          }
          return false;
        }
      }
    },

    computed: {
      normalizedTarget: function() {
        if (this.target && this.target._isVue) {
          return this.target.$el;
        }
        return this.target;
      },
      normalizedOptions: function() {
        if (this.target) {
          return {
            target: this.normalizedTarget,
            ...this.options
          };
        }
        return this.options;
      }
    }
  };
</script>
