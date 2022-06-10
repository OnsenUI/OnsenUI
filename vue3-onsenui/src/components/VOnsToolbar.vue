<template>
  <ons-toolbar :modifier="normalizedModifier">
    <slot></slot>
  </ons-toolbar>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-toolbar.js';
  import { deriveEvents, hidable, modifier } from '../mixins/index.js';

  const name = 'v-ons-toolbar';

  export default {
    name,
    mixins: [deriveEvents(name), hidable, modifier]
  };
</script>
