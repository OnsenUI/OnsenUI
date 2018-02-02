<template>
  <ons-progress-bar v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-progress-bar>
</template>

<script>
  /* This file is generated automatically */
  import 'onsenui/esm/elements/ons-progress-bar';
  import { deriveEvents, modifier } from '../mixins';

  export default {
    name: 'v-ons-progress-bar',
    mixins: [deriveEvents, modifier]
  };
</script>