<template>
  <ons-toolbar-button :modifier="normalizedModifier">
    <slot></slot>
  </ons-toolbar-button>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-toolbar-button.js';
  import { deriveEvents, modifier } from '../mixins/index.js';

  const name = 'v-ons-toolbar-button';

  export default {
    name,
    mixins: [deriveEvents(name), modifier]
  };
</script>
