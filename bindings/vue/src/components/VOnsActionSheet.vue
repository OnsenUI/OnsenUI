<template>
  <ons-action-sheet v-on="unrecognizedListeners">
    <slot></slot>
  </ons-action-sheet>
</template>

<script>
  import 'onsenui/esm/elements/ons-action-sheet';
  import { deriveEvents, hidable, hasOptions, dialogCancel, deriveDBB, portal } from '../mixins';

  export default {
    mixins: [deriveEvents, hidable, hasOptions, dialogCancel, deriveDBB, portal]
  };
</script>