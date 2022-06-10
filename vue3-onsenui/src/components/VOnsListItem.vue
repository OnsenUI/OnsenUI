<template>
  <ons-list-item :modifier="normalizedModifier" v-on:expand="onExpand">
    <slot></slot>
  </ons-list-item>
</template>

<script>
  import 'onsenui/esm/elements/ons-list-item.js';
  import { deriveEvents, modifier } from '../mixins/index.js';

  const name = 'v-ons-list-item';

  export default {
    name,
    mixins: [deriveEvents(name), modifier],
    emits: ['update:expanded'],
    methods: {
      onExpand() {
        this.$emit('update:expanded', this.$el.expanded);
      }
    }
  };
</script>
