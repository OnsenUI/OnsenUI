<template>
  <ons-splitter-content>
    <slot></slot>
  </ons-splitter-content>
</template>

<script>
  import 'onsenui/esm/elements/ons-splitter-content.js';
  import { deriveEvents } from '../mixins/index.js';

  const name = 'v-ons-splitter-content';

  export default {
    name,
    mixins: [deriveEvents(name)]
  };
</script>
