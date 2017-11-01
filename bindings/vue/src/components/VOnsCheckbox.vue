<template>
  <ons-checkbox v-on="unrecognizedListeners">
    <slot></slot>
  </ons-checkbox>
</template>

<script>
  import 'onsenui/esm/elements/ons-checkbox';
  import { deriveEvents, modelCheckbox } from '../mixins';

  export default {
    name: 'v-ons-checkbox',
    mixins: [deriveEvents, modelCheckbox]
  };
</script>