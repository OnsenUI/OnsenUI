<template>
  <ons-dialog v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-dialog>
</template>

<script>
  /* This file is generated automatically */
  import 'onsenui/esm/elements/ons-dialog';
  import { deriveEvents, hidable, hasOptions, dialogCancel, deriveDBB, portal, modifier } from '../mixins';

  export default {
    name: 'v-ons-dialog',
    mixins: [deriveEvents, hidable, hasOptions, dialogCancel, deriveDBB, portal, modifier]
  };
</script>