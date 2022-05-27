<template>
  <ons-list v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-list>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-list';
  import { deriveEvents, modifier } from '../mixins';

  export default {
    name: 'v-ons-list',
    mixins: [deriveEvents, modifier]
  };
</script>