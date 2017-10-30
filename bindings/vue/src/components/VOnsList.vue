<template>
  <ons-list v-on="unrecognizedListeners">
    <slot></slot>
  </ons-list>
</template>

<script>
  import 'onsenui/core-src/elements/ons-list';
  import { deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents]
  };
</script>