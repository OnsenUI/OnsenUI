<template>
  <ons-icon v-on="unrecognizedListeners">
    <slot></slot>
  </ons-icon>
</template>

<script>
  import 'onsenui/esm/elements/ons-icon';
  import { deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents]
  };
</script>