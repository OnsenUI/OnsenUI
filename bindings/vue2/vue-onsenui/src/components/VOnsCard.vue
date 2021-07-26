<template>
  <ons-card v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-card>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-card';
  import { deriveEvents, modifier } from '../mixins';

  export default {
    name: 'v-ons-card',
    mixins: [deriveEvents, modifier]
  };
</script>