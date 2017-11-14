<template>
  <ons-range v-on="unrecognizedListeners">
    <slot></slot>
  </ons-range>
</template>

<script>
  /* This file is generated automatically */
  import 'onsenui/esm/elements/ons-range';
  import { deriveEvents, modelInput } from '../mixins';

  export default {
    name: 'v-ons-range',
    mixins: [deriveEvents, modelInput]
  };
</script>