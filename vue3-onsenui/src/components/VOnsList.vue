<template>
  <ons-list :modifier="normalizedModifier">
    <slot></slot>
  </ons-list>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-list.js';
  import { deriveEvents, modifier } from '../mixins/index.js';

  const name = 'v-ons-list';

  export default {
    name,
    mixins: [deriveEvents(name), modifier]
  };
</script>
