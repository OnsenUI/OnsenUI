<template>
  <ons-list-title :modifier="normalizedModifier">
    <slot></slot>
  </ons-list-title>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-list-title';
  import { deriveEvents, modifier } from '../mixins';

  const name = 'v-ons-list-title';

  export default {
    name,
    mixins: [deriveEvents(name), modifier]
  };
</script>
