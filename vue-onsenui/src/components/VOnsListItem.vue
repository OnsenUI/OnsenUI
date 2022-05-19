<template>
  <ons-list-item v-on="unrecognizedListeners" :modifier="normalizedModifier" v-on:expand="onExpand">
    <slot></slot>
  </ons-list-item>
</template>

<script>
  import 'onsenui/esm/elements/ons-list-item';
  import { deriveEvents, modifier } from '../mixins';

  export default {
    name: 'v-ons-list-item',
    mixins: [deriveEvents, modifier],
    methods: {
      onExpand() {
        this.$emit('update:expanded', this.$el.expanded);
      }
    }
  };
</script>
