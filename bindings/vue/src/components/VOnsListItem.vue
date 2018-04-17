<template>
  <ons-list-item v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-list-item>
</template>

<script>
  import 'onsenui/esm/elements/ons-list-item';
  import { deriveEvents, modifier } from '../mixins';

  export default {
    name: 'v-ons-list-item',
    mixins: [deriveEvents, modifier],
    props: {
      expanded: {
        type: Boolean
      }
    },

    watch: {
      expanded() {
        const action = this.expanded ? 'show' : 'hide';
        this.$el[action + 'Expansion']();
      }
    }
  };
</script>