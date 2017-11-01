<template>
  <ons-fab v-on="unrecognizedListeners">
    <slot></slot>
  </ons-fab>
</template>

<script>
  import 'onsenui/esm/elements/ons-fab';
  import { deriveEvents, hidable } from '../mixins';

  export default {
    name: 'v-ons-fab',
    mixins: [deriveEvents, hidable]
  };
</script>