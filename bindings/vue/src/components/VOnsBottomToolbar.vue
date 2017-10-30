<template>
  <ons-bottom-toolbar v-on="unrecognizedListeners">
    <slot></slot>
  </ons-bottom-toolbar>
</template>

<script>
  import 'onsenui/esm/elements/ons-bottom-toolbar';
  import { deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents]
  };
</script>