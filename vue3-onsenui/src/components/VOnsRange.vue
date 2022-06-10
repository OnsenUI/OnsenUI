<template>
  <ons-range :modifier="normalizedModifier">
    <slot></slot>
  </ons-range>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-range.js';
  import { deriveEvents, modelInput, modifier } from '../mixins/index.js';

  const name = 'v-ons-range';

  export default {
    name,
    mixins: [deriveEvents(name), modelInput, modifier]
  };
</script>
