<template>
  <ons-list-title v-on="unrecognizedListeners">
    <slot></slot>
  </ons-list-title>
</template>

<script>
  import 'onsenui/esm/elements/ons-list-title';
  import { deriveEvents } from '../mixins';

  export default {
    name: 'v-ons-list-title',
    mixins: [deriveEvents]
  };
</script>