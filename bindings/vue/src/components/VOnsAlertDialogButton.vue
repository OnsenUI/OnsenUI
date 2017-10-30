<template>
  <ons-alert-dialog-button v-on="unrecognizedListeners">
    <slot></slot>
  </ons-alert-dialog-button>
</template>

<script>
  import 'onsenui/esm/elements/ons-alert-dialog-button';
  import { deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents]
  };
</script>