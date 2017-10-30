<template>
  <ons-list-title v-on="unrecognizedListeners">
    <slot></slot>
  </ons-list-title>
</template>

<script>
  import 'onsenui/core-src/elements/ons-list-title';
  import { deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents]
  };
</script>