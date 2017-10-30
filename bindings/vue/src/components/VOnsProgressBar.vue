<template>
  <ons-progress-bar v-on="unrecognizedListeners">
    <slot></slot>
  </ons-progress-bar>
</template>

<script>
  import 'onsenui/esm/elements/ons-progress-bar';
  import { deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents]
  };
</script>