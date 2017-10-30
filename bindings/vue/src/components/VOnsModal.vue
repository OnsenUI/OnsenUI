<template>
  <ons-modal v-on="unrecognizedListeners">
    <slot></slot>
  </ons-modal>
</template>

<script>
  import 'onsenui/esm/elements/ons-modal';
  import { deriveEvents, hidable, hasOptions, deriveDBB, portal } from '../mixins';

  export default {
    mixins: [deriveEvents, hidable, hasOptions, deriveDBB, portal]
  };
</script>