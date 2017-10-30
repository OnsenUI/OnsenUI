<template>
  <ons-search-input v-on="unrecognizedListeners">
    <slot></slot>
  </ons-search-input>
</template>

<script>
  import 'onsenui/core-src/elements/ons-search-input';
  import { deriveEvents, modelInput } from '../mixins';

  export default {
    mixins: [deriveEvents, modelInput]
  };
</script>