<template>
  <ons-range v-on="unrecognizedListeners">
    <slot></slot>
  </ons-range>
</template>

<script>
  import 'onsenui/core-src/elements/ons-range';
  import { deriveEvents, modelInput } from '../mixins';

  export default {
    mixins: [deriveEvents, modelInput]
  };
</script>