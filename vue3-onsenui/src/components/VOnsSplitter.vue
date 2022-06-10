<template>
  <ons-splitter>
    <slot></slot>
  </ons-splitter>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-splitter.js';
  import { deriveEvents, selfProvider, deriveDBB } from '../mixins/index.js';

  const name = 'v-ons-splitter';

  export default {
    name,
    mixins: [deriveEvents(name), selfProvider, deriveDBB]
  };
</script>
