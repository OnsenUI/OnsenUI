<template>
  <ons-action-sheet-button :modifier="normalizedModifier">
    <slot></slot>
  </ons-action-sheet-button>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-action-sheet-button';
  import { deriveEvents, modifier } from '../mixins';

  const name = 'v-ons-action-sheet-button';

  export default {
    name,
    mixins: [deriveEvents(name), modifier]
  };
</script>
