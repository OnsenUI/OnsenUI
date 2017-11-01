<template>
  <ons-action-sheet-button v-on="unrecognizedListeners">
    <slot></slot>
  </ons-action-sheet-button>
</template>

<script>
  import 'onsenui/esm/elements/ons-action-sheet-button';
  import { deriveEvents } from '../mixins';

  export default {
    name: 'v-ons-action-sheet-button',
    mixins: [deriveEvents]
  };
</script>