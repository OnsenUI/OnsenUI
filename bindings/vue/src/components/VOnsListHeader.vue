<template>
  <ons-list-header v-on="unrecognizedListeners">
    <slot></slot>
  </ons-list-header>
</template>

<script>
  import 'onsenui/core-src/elements/ons-list-header';
  import { deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents]
  };
</script>