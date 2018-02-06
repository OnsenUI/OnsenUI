<template>
  <ons-fab v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-fab>
</template>

<script>
  /* This file is generated automatically */
  import 'onsenui/esm/elements/ons-fab';
  import { deriveEvents, hidable, modifier } from '../mixins';

  export default {
    name: 'v-ons-fab',
    mixins: [deriveEvents, hidable, modifier]
  };
</script>