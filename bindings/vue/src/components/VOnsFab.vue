<template>
  <ons-fab v-on="unrecognizedListeners">
    <slot></slot>
  </ons-fab>
</template>

<script>
  import 'onsenui/core-src/elements/ons-fab';
  import { deriveEvents, hidable } from '../mixins';

  export default {
    mixins: [deriveEvents, hidable]
  };
</script>