<template>
  <ons-list-item v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-list-item>
</template>

<script>
  /* This file is generated automatically */
  import 'onsenui/esm/elements/ons-list-item';
  import { deriveEvents, modifier, hidable } from '../mixins';

  export default {
    name: 'v-ons-list-item',
    mixins: [deriveEvents, modifier, hidable]
  };
</script>