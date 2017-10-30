<template>
  <ons-splitter v-on="unrecognizedListeners">
    <slot></slot>
  </ons-splitter>
</template>

<script>
  import 'onsenui/esm/elements/ons-splitter';
  import { deriveEvents, selfProvider, deriveDBB } from '../mixins';

  export default {
    mixins: [deriveEvents, selfProvider, deriveDBB]
  };
</script>