<template>
  <ons-input v-on="unrecognizedListeners">
    <slot></slot>
  </ons-input>
</template>

<script>
  import 'onsenui/esm/elements/ons-input';
  import { deriveEvents, modelInput } from '../mixins';

  export default {
    mixins: [deriveEvents, modelInput]
  };
</script>