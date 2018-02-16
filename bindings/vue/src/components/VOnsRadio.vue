<template>
  <ons-radio v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-radio>
</template>

<script>
  /* This file is generated automatically */
  import 'onsenui/esm/elements/ons-radio';
  import { deriveEvents, modelRadio, modifier } from '../mixins';

  export default {
    name: 'v-ons-radio',
    mixins: [deriveEvents, modelRadio, modifier]
  };
</script>