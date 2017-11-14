<template>
  <ons-progress-bar v-on="unrecognizedListeners">
    <slot></slot>
  </ons-progress-bar>
</template>

<script>
  /* This file is generated automatically */
  import 'onsenui/esm/elements/ons-progress-bar';
  import { deriveEvents } from '../mixins';

  export default {
    name: 'v-ons-progress-bar',
    mixins: [deriveEvents]
  };
</script>