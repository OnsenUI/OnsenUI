<template>
  <ons-card v-on="unrecognizedListeners">
    <slot></slot>
  </ons-card>
</template>

<script>
  import 'onsenui/core-src/elements/ons-card';
  import { deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents]
  };
</script>