<template>
  <ons-button v-on="unrecognizedListeners">
    <slot></slot>
  </ons-button>
</template>

<script>
  import 'onsenui/core-src/elements/ons-button';
  import { deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents]
  };
</script>