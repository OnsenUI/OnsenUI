<template>
  <ons-toolbar-button v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-toolbar-button>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-toolbar-button';
  import { deriveEvents, modifier } from '../mixins';

  export default {
    name: 'v-ons-toolbar-button',
    mixins: [deriveEvents, modifier]
  };
</script>