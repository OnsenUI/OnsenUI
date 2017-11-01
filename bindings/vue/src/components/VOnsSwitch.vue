<template>
  <ons-switch v-on="unrecognizedListeners">
    <slot></slot>
  </ons-switch>
</template>

<script>
  import 'onsenui/esm/elements/ons-switch';
  import { deriveEvents, modelCheckbox } from '../mixins';

  export default {
    name: 'v-ons-switch',
    mixins: [deriveEvents, modelCheckbox]
  };
</script>