<template>
  <ons-icon v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-icon>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-icon';
  import { deriveEvents, modifier } from '../mixins';

  export default {
    name: 'v-ons-icon',
    mixins: [deriveEvents, modifier]
  };
</script>