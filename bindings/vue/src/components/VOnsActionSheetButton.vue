<template>
  <ons-action-sheet-button v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-action-sheet-button>
</template>

<script>
  /* This file is generated automatically */
  import 'onsenui/esm/elements/ons-action-sheet-button';
  import { deriveEvents, modifier } from '../mixins';

  export default {
    name: 'v-ons-action-sheet-button',
    mixins: [deriveEvents, modifier]
  };
</script>