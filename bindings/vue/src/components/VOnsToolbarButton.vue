<template>
  <ons-toolbar-button v-on="unrecognizedListeners">
    <slot></slot>
  </ons-toolbar-button>
</template>

<script>
  import 'onsenui/esm/elements/ons-toolbar-button';
  import { deriveEvents } from '../mixins';

  export default {
    name: 'v-ons-toolbar-button',
    mixins: [deriveEvents]
  };
</script>