<template>
  <ons-button :modifier="normalizedModifier">
    <slot></slot>
  </ons-button>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-button';
  import { deriveEvents, modifier } from '../mixins';

  const name = 'v-ons-button';

  export default {
    name,
    mixins: [deriveEvents(name), modifier]
  };
</script>