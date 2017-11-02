<template>
  <ons-list-item v-on="unrecognizedListeners">
    <slot></slot>
  </ons-list-item>
</template>

<script>
  /* This file is generated automatically */
  import 'onsenui/esm/elements/ons-list-item';
  import { deriveEvents } from '../mixins';

  export default {
    name: 'v-ons-list-item',
    mixins: [deriveEvents]
  };
</script>