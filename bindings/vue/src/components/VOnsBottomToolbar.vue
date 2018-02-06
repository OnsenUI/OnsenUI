<template>
  <ons-bottom-toolbar v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-bottom-toolbar>
</template>

<script>
  /* This file is generated automatically */
  import 'onsenui/esm/elements/ons-bottom-toolbar';
  import { deriveEvents, modifier } from '../mixins';

  export default {
    name: 'v-ons-bottom-toolbar',
    mixins: [deriveEvents, modifier]
  };
</script>