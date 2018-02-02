<template>
  <ons-range v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-range>
</template>

<script>
  /* This file is generated automatically */
  import 'onsenui/esm/elements/ons-range';
  import { deriveEvents, modelInput, modifier } from '../mixins';

  export default {
    name: 'v-ons-range',
    mixins: [deriveEvents, modelInput, modifier]
  };
</script>