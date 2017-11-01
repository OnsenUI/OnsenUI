<template>
  <ons-toolbar v-on="unrecognizedListeners">
    <slot></slot>
  </ons-toolbar>
</template>

<script>
  import 'onsenui/esm/elements/ons-toolbar';
  import { deriveEvents } from '../mixins';

  export default {
    name: 'v-ons-toolbar',
    mixins: [deriveEvents]
  };
</script>