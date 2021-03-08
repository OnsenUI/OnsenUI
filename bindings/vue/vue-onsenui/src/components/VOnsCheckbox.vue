<template>
  <ons-checkbox :modifier="normalizedModifier">
    <slot></slot>
  </ons-checkbox>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-checkbox';
  import { deriveEvents, modelCheckbox, modifier } from '../mixins';

  export default {
    name: 'v-ons-checkbox',
    mixins: [deriveEvents, modelCheckbox, modifier]
  };
</script>