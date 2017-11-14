<template>
  <ons-checkbox v-on="unrecognizedListeners">
    <slot></slot>
  </ons-checkbox>
</template>

<script>
  /* This file is generated automatically */
  import 'onsenui/esm/elements/ons-checkbox';
  import { deriveEvents, modelCheckbox } from '../mixins';

  export default {
    name: 'v-ons-checkbox',
    mixins: [deriveEvents, modelCheckbox]
  };
</script>