<template>
  <ons-checkbox v-on="unrecognizedListeners">
    <slot></slot>
  </ons-checkbox>
</template>

<script>
  import 'onsenui/core-src/elements/ons-checkbox';
  import { deriveEvents, modelCheckbox } from '../mixins';

  export default {
    mixins: [deriveEvents, modelCheckbox]
  };
</script>