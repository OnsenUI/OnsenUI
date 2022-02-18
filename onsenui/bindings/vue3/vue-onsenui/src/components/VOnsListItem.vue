<template>
  <ons-list-item :modifier="normalizedModifier" :expanded="expanded" v-on:expansion="onExpansion">
    <slot></slot>
  </ons-list-item>
</template>

<script>
  import 'onsenui/esm/elements/ons-list-item';
  import { deriveEvents, modifier } from '../mixins';

  const name = 'v-ons-list-item';

  export default {
    name,
    mixins: [deriveEvents(name), modifier],
    props: {
      expanded: {
        type: Boolean
      }
    },
    emits: ['update:expanded'],
    methods: {
      onExpansion() {
        if (this.expanded !== this.$el.expanded) {
          this.$emit('update:expanded', this.$el.expanded);
        }
      }
    }
  };
</script>
