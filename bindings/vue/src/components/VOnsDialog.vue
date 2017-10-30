<template>
  <ons-dialog v-on="unrecognizedListeners">
    <slot></slot>
  </ons-dialog>
</template>

<script>
  import 'onsenui/esm/elements/ons-dialog';
  import { deriveEvents, hidable, hasOptions, dialogCancel, deriveDBB, portal } from '../mixins';

  export default {
    mixins: [deriveEvents, hidable, hasOptions, dialogCancel, deriveDBB, portal]
  };
</script>