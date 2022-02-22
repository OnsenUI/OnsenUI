<template>
  <ons-fab :modifier="normalizedModifier">
    <slot></slot>
  </ons-fab>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-fab';
  import { deriveEvents, hidable, modifier } from '../mixins';

  const name = 'v-ons-fab';

  export default {
    name,
    mixins: [deriveEvents(name), hidable, modifier]
  };
</script>