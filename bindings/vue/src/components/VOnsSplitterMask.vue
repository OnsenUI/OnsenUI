<template>
  <ons-splitter-mask v-on="unrecognizedListeners">
    <slot></slot>
  </ons-splitter-mask>
</template>

<script>
  import 'onsenui/esm/elements/ons-splitter-mask';
  import { deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents]
  };
</script>