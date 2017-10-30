<template>
  <ons-radio v-on="unrecognizedListeners">
    <slot></slot>
  </ons-radio>
</template>

<script>
  import 'onsenui/core-src/elements/ons-radio';
  import { deriveEvents, modelRadio } from '../mixins';

  export default {
    mixins: [deriveEvents, modelRadio]
  };
</script>