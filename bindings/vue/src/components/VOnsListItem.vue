<template>
  <ons-list-item v-on="unrecognizedListeners">
    <slot></slot>
  </ons-list-item>
</template>

<script>
  import 'onsenui/core-src/elements/ons-list-item';
  import { deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents]
  };
</script>