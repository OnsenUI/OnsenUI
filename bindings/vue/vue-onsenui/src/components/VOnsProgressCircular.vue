<template>
  <ons-progress-circular :modifier="normalizedModifier">
    <slot></slot>
  </ons-progress-circular>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-progress-circular';
  import { deriveEvents, modifier } from '../mixins';

  const name = 'v-ons-progress-circular';

  export default {
    name,
    mixins: [deriveEvents(name), modifier]
  };
</script>