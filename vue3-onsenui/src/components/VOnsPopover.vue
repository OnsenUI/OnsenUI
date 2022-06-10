<template>
  <ons-popover>
    <slot></slot>
  </ons-popover>
</template>

<script>
  import 'onsenui/esm/elements/ons-popover.js';
  import { hidable, hasOptions, dialogCancel, deriveEvents, deriveDBB, portal } from '../mixins/index.js';

  const name = 'v-ons-popover';

  export default {
    name,
    mixins: [hidable, hasOptions, dialogCancel, deriveEvents(name), deriveDBB, portal],

    props: {
      target: {
        validator(value) {
          return value.__isVue || typeof value === 'string' || value instanceof Event || value instanceof HTMLElement;
        }
      }
    },

    computed: {
      normalizedTarget() {
        if (this.target && this.target.__isVue) {
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
