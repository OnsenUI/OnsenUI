<template>
  <ons-icon v-on="unrecognizedListeners">
    <slot></slot>
  </ons-icon>
</template>

<script>
  import 'onsenui/esm/elements/ons-icon';
  import { deriveEvents } from '../mixins';

  export default {
    name: 'v-ons-icon',
    mixins: [deriveEvents]
  };
</script>