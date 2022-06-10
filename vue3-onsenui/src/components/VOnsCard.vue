<template>
  <ons-card :modifier="normalizedModifier">
    <slot></slot>
  </ons-card>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-card.js';
  import { deriveEvents, modifier } from '../mixins/index.js';

  const name = 'v-ons-card';

  export default {
    name,
    mixins: [deriveEvents(name), modifier]
  };
</script>
