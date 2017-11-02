<template>
  <ons-search-input v-on="unrecognizedListeners">
    <slot></slot>
  </ons-search-input>
</template>

<script>
  /* This file is generated automatically */
  import 'onsenui/esm/elements/ons-search-input';
  import { deriveEvents, modelInput } from '../mixins';

  export default {
    name: 'v-ons-search-input',
    mixins: [deriveEvents, modelInput]
  };
</script>