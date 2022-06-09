<template>
  <ons-alert-dialog-button :modifier="normalizedModifier">
    <slot></slot>
  </ons-alert-dialog-button>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-alert-dialog-button';
  import { deriveEvents, modifier } from '../mixins';

  const name = 'v-ons-alert-dialog-button';

  export default {
    name,
    mixins: [deriveEvents(name), modifier]
  };
</script>
