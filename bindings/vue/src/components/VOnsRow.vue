<template>
  <ons-row v-on="unrecognizedListeners">
    <slot></slot>
  </ons-row>
</template>

<script>
  import 'onsenui/core-src/elements/ons-row';
  import { deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents]
  };
</script>