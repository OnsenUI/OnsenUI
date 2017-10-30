<template>
  <ons-splitter-content v-on="unrecognizedListeners">
    <slot></slot>
  </ons-splitter-content>
</template>

<script>
  import 'onsenui/core-src/elements/ons-splitter-content';
  import { deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents]
  };
</script>