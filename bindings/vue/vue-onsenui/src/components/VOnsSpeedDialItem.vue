<template>
  <ons-speed-dial-item :modifier="normalizedModifier">
    <slot></slot>
  </ons-speed-dial-item>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-speed-dial-item';
  import { deriveEvents, modifier } from '../mixins';

  export default {
    name: 'v-ons-speed-dial-item',
    mixins: [deriveEvents, modifier]
  };
</script>