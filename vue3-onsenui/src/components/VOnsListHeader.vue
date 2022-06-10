<template>
  <ons-list-header :modifier="normalizedModifier">
    <slot></slot>
  </ons-list-header>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-list-header.js';
  import { deriveEvents, modifier } from '../mixins/index.js';

  const name = 'v-ons-list-header';

  export default {
    name,
    mixins: [deriveEvents(name), modifier]
  };
</script>
