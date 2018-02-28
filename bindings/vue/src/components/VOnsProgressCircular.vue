<template>
  <ons-progress-circular v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-progress-circular>
</template>

<script>
  /* This file is generated automatically */
  import 'onsenui/esm/elements/ons-progress-circular';
  import { deriveEvents, modifier } from '../mixins';

  export default {
    name: 'v-ons-progress-circular',
    mixins: [deriveEvents, modifier]
  };
</script>