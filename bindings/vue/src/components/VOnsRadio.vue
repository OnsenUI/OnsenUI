<template>
  <ons-radio v-on="unrecognizedListeners">
    <slot></slot>
  </ons-radio>
</template>

<script>
  import 'onsenui/esm/elements/ons-radio';
  import { deriveEvents, modelRadio } from '../mixins';

  export default {
    mixins: [deriveEvents, modelRadio]
  };
</script>