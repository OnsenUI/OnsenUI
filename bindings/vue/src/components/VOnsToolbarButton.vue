<template>
  <ons-toolbar-button v-on="unrecognizedListeners">
    <slot></slot>
  </ons-toolbar-button>
</template>

<script>
  import 'onsenui/core-src/elements/ons-toolbar-button';
  import { deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents]
  };
</script>