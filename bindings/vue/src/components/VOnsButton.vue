<template>
  <ons-button v-on="unrecognizedListeners">
    <slot></slot>
  </ons-button>
</template>

<script>
  import 'onsenui/esm/elements/ons-button';
  import { deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents]
  };
</script>