<template>
  <ons-row>
    <slot></slot>
  </ons-row>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-row';
  import { deriveEvents } from '../mixins';

  const name = 'v-ons-row';

  export default {
    name,
    mixins: [deriveEvents(name)]
  };
</script>