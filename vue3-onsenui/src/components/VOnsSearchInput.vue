<template>
  <ons-search-input :modifier="normalizedModifier">
    <slot></slot>
  </ons-search-input>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-search-input';
  import { deriveEvents, modelInput, modifier } from '../mixins';

  const name = 'v-ons-search-input';

  export default {
    name,
    mixins: [deriveEvents(name), modelInput, modifier]
  };
</script>
