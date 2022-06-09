<template>
  <ons-splitter-content>
    <slot></slot>
  </ons-splitter-content>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-splitter-content';
  import { deriveEvents } from '../mixins';

  const name = 'v-ons-splitter-content';

  export default {
    name,
    mixins: [deriveEvents(name)]
  };
</script>
