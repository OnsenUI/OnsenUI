<template>
  <ons-speed-dial-item v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-speed-dial-item>
</template>

<script>
  /* This file is generated automatically */
  import 'onsenui/esm/elements/ons-speed-dial-item';
  import { deriveEvents, modifier } from '../mixins';

  export default {
    name: 'v-ons-speed-dial-item',
    mixins: [deriveEvents, modifier]
  };
</script>