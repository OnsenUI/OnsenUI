<template>
  <ons-popover v-bind="orderedProps">
    <slot></slot>
  </ons-popover>
</template>

<script>
  import 'onsenui/esm/elements/ons-popover.js';
  import { hidable, hasOptions, dialog, deriveEvents, deriveDBB, portal } from '../mixins/index.js';

  const name = 'v-ons-popover';

  export default {
    name,
    mixins: [hidable, hasOptions, dialog, deriveEvents(name), deriveDBB, portal],

    props: {
      target: {
        validator(value) {
          return value.__isVue || typeof value === 'string' || value instanceof Event || value instanceof HTMLElement;
        }
      }
    },

    computed: {
      normalizedTarget() {
        return this.target.$el || this.target;
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
