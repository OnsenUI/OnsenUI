<template>
  <ons-splitter-mask>
    <slot></slot>
  </ons-splitter-mask>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-splitter-mask';
  import { deriveEvents } from '../mixins';

  const name = 'v-ons-splitter-mask';

  export default {
    name,
    mixins: [deriveEvents(name)]
  };
</script>
