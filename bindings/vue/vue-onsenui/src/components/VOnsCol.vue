<template>
  <ons-col>
    <slot></slot>
  </ons-col>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-col';
  import { deriveEvents } from '../mixins';

  const name = 'v-ons-col';

  export default {
    name,
    mixins: [deriveEvents(name)]
  };
</script>