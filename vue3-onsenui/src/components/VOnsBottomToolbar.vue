<template>
  <ons-bottom-toolbar :modifier="normalizedModifier">
    <slot></slot>
  </ons-bottom-toolbar>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-bottom-toolbar.js';
  import { deriveEvents, modifier } from '../mixins/index.js';

  const name = 'v-ons-bottom-toolbar';

  export default {
    name,
    mixins: [deriveEvents(name), modifier]
  };
</script>
