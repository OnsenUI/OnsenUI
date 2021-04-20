<template>
  <ons-list-header v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-list-header>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-list-header';
  import { deriveEvents, modifier } from '../mixins';

  export default {
    name: 'v-ons-list-header',
    mixins: [deriveEvents, modifier]
  };
</script>