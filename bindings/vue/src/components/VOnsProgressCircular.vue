<template>
  <ons-progress-circular v-on="unrecognizedListeners">
    <slot></slot>
  </ons-progress-circular>
</template>

<script>
  import 'onsenui/core-src/elements/ons-progress-circular';
  import { deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents]
  };
</script>