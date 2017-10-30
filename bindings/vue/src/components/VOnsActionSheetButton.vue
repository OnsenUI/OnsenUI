<template>
  <ons-action-sheet-button v-on="unrecognizedListeners">
    <slot></slot>
  </ons-action-sheet-button>
</template>

<script>
  import 'onsenui/core-src/elements/ons-action-sheet-button';
  import { deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents]
  };
</script>