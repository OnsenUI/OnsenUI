<template>
  <ons-popover>
    <slot></slot>
  </ons-popover>
</template>

<script>
  import { hidable, hasOptions, modifier, deriveEvents, deriveHandlers } from '../mixins';

  export default {
    mixins: [hidable, hasOptions, modifier, deriveEvents, deriveHandlers],

    props: {
      target: {
        validator(value) {
          return value._isVue || typeof value === 'string' || value instanceof Event || value instanceof HTMLElement;
        }
      }
    },

    computed: {
      normalizedTarget() {
        if (this.target && this.target._isVue) {
          return this.target.$el;
        }
        return this.target;
      },
      normalizedOptions() {
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
