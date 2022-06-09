<template>
  <ons-switch :modifier="normalizedModifier">
    <slot></slot>
  </ons-switch>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-switch';
  import { deriveEvents, modelCheckbox, modifier } from '../mixins';

  const name = 'v-ons-switch';

  export default {
    name,
    mixins: [deriveEvents(name), modelCheckbox, modifier]
  };
</script>
