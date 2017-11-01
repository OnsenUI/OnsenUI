<template>
  <ons-card v-on="unrecognizedListeners">
    <slot></slot>
  </ons-card>
</template>

<script>
  import 'onsenui/esm/elements/ons-card';
  import { deriveEvents } from '../mixins';

  export default {
    name: 'v-ons-card',
    mixins: [deriveEvents]
  };
</script>