<template>
  <ons-row v-on="unrecognizedListeners">
    <slot></slot>
  </ons-row>
</template>

<script>
  /* This file is generated automatically */
  import 'onsenui/esm/elements/ons-row';
  import { deriveEvents } from '../mixins';

  export default {
    name: 'v-ons-row',
    mixins: [deriveEvents]
  };
</script>