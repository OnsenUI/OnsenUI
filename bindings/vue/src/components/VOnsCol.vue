<template>
  <ons-col v-on="unrecognizedListeners">
    <slot></slot>
  </ons-col>
</template>

<script>
  import 'onsenui/core-src/elements/ons-col';
  import { deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents]
  };
</script>