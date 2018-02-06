<template>
  <ons-list v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-list>
</template>

<script>
  /* This file is generated automatically */
  import 'onsenui/esm/elements/ons-list';
  import { deriveEvents, modifier } from '../mixins';

  export default {
    name: 'v-ons-list',
    mixins: [deriveEvents, modifier]
  };
</script>