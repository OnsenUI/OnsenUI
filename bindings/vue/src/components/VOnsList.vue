<template>
  <ons-list v-on="unrecognizedListeners">
    <slot></slot>
  </ons-list>
</template>

<script>
  import 'onsenui/esm/elements/ons-list';
  import { deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents]
  };
</script>