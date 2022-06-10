<template>
  <ons-radio :modifier="normalizedModifier">
    <slot></slot>
  </ons-radio>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-radio.js';
  import { deriveEvents, modelRadio, modifier } from '../mixins/index.js';

  const name = 'v-ons-radio';

  export default {
    name,
    mixins: [deriveEvents(name), modelRadio, modifier]
  };
</script>
