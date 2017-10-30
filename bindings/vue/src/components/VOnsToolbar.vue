<template>
  <ons-toolbar v-on="unrecognizedListeners">
    <slot></slot>
  </ons-toolbar>
</template>

<script>
  import 'onsenui/core-src/elements/ons-toolbar';
  import { deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents]
  };
</script>