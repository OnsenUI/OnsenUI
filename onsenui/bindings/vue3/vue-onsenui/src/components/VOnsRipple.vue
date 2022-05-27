<template>
  <ons-ripple>
    <slot></slot>
  </ons-ripple>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-ripple';
  import { deriveEvents } from '../mixins';

  const name = 'v-ons-ripple';

  export default {
    name,
    mixins: [deriveEvents(name)]
  };
</script>
