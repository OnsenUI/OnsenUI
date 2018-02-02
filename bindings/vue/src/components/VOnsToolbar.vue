<template>
  <ons-toolbar v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-toolbar>
</template>

<script>
  /* This file is generated automatically */
  import 'onsenui/esm/elements/ons-toolbar';
  import { deriveEvents, modifier } from '../mixins';

  export default {
    name: 'v-ons-toolbar',
    mixins: [deriveEvents, modifier]
  };
</script>