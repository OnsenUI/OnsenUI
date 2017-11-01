<template>
  <ons-ripple v-on="unrecognizedListeners">
    <slot></slot>
  </ons-ripple>
</template>

<script>
  import 'onsenui/esm/elements/ons-ripple';
  import { deriveEvents } from '../mixins';

  export default {
    name: 'v-ons-ripple',
    mixins: [deriveEvents]
  };
</script>