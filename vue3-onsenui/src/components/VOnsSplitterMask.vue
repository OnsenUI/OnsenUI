<template>
  <ons-splitter-mask>
    <slot></slot>
  </ons-splitter-mask>
</template>

<script>
  import 'onsenui/esm/elements/ons-splitter-mask.js';
  import { deriveEvents } from '../mixins/index.js';

  const name = 'v-ons-splitter-mask';

  export default {
    name,
    mixins: [deriveEvents(name)]
  };
</script>
