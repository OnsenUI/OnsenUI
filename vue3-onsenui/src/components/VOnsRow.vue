<template>
  <ons-row>
    <slot></slot>
  </ons-row>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-row.js';
  import { deriveEvents } from '../mixins/index.js';

  const name = 'v-ons-row';

  export default {
    name,
    mixins: [deriveEvents(name)]
  };
</script>
