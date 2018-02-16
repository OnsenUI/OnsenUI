<template>
  <ons-alert-dialog-button v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-alert-dialog-button>
</template>

<script>
  /* This file is generated automatically */
  import 'onsenui/esm/elements/ons-alert-dialog-button';
  import { deriveEvents, modifier } from '../mixins';

  export default {
    name: 'v-ons-alert-dialog-button',
    mixins: [deriveEvents, modifier]
  };
</script>