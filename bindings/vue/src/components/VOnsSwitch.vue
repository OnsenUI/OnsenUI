<template>
  <ons-switch v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-switch>
</template>

<script>
  /* This file is generated automatically */
  import 'onsenui/esm/elements/ons-switch';
  import { deriveEvents, modelCheckbox, modifier } from '../mixins';

  export default {
    name: 'v-ons-switch',
    mixins: [deriveEvents, modelCheckbox, modifier]
  };
</script>