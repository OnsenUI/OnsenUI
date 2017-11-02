<template>
  <ons-action-sheet v-on="unrecognizedListeners">
    <slot></slot>
  </ons-action-sheet>
</template>

<script>
  /* This file is generated automatically */
  import 'onsenui/esm/elements/ons-action-sheet';
  import { deriveEvents, hidable, hasOptions, dialogCancel, deriveDBB, portal } from '../mixins';

  export default {
    name: 'v-ons-action-sheet',
    mixins: [deriveEvents, hidable, hasOptions, dialogCancel, deriveDBB, portal]
  };
</script>