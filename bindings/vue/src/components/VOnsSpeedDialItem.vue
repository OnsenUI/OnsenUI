<template>
  <ons-speed-dial-item v-on="unrecognizedListeners">
    <slot></slot>
  </ons-speed-dial-item>
</template>

<script>
  import 'onsenui/core-src/elements/ons-speed-dial-item';
  import { deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents]
  };
</script>