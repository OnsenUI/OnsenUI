<template>
  <ons-radio v-on="unrecognizedListeners">
    <slot></slot>
  </ons-radio>
</template>

<script>
  /* This file is generated automatically */
  import 'onsenui/esm/elements/ons-radio';
  import { deriveEvents, modelRadio } from '../mixins';

  export default {
    name: 'v-ons-radio',
    mixins: [deriveEvents, modelRadio]
  };
</script>