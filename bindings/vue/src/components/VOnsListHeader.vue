<template>
  <ons-list-header v-on="unrecognizedListeners">
    <slot></slot>
  </ons-list-header>
</template>

<script>
  import 'onsenui/esm/elements/ons-list-header';
  import { deriveEvents } from '../mixins';

  export default {
    name: 'v-ons-list-header',
    mixins: [deriveEvents]
  };
</script>