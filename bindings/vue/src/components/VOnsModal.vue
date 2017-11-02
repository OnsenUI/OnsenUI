<template>
  <ons-modal v-on="unrecognizedListeners">
    <slot></slot>
  </ons-modal>
</template>

<script>
  /* This file is generated automatically */
  import 'onsenui/esm/elements/ons-modal';
  import { deriveEvents, hidable, hasOptions, deriveDBB, portal } from '../mixins';

  export default {
    name: 'v-ons-modal',
    mixins: [deriveEvents, hidable, hasOptions, deriveDBB, portal]
  };
</script>