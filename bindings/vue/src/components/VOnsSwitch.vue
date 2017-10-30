<template>
  <ons-switch v-on="unrecognizedListeners">
    <slot></slot>
  </ons-switch>
</template>

<script>
  import 'onsenui/esm/elements/ons-switch';
  import { deriveEvents, modelCheckbox } from '../mixins';

  export default {
    mixins: [deriveEvents, modelCheckbox]
  };
</script>