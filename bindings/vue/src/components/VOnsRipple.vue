<template>
  <ons-ripple v-on="unrecognizedListeners">
    <slot></slot>
  </ons-ripple>
</template>

<script>
  import 'onsenui/core-src/elements/ons-ripple';
  import { deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents]
  };
</script>