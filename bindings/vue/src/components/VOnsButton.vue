<template>
  <ons-button v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-button>
</template>

<script>
  /* This file is generated automatically */
  import 'onsenui/esm/elements/ons-button';
  import { deriveEvents, modifier } from '../mixins';

  export default {
    name: 'v-ons-button',
    mixins: [deriveEvents, modifier]
  };
</script>