<template>
  <ons-col>
    <slot></slot>
  </ons-col>
</template>

<script>
  import 'onsenui/esm/elements/ons-col.js';
  import { deriveEvents } from '../mixins/index.js';

  const name = 'v-ons-col';

  export default {
    name,
    mixins: [deriveEvents(name)]
  };
</script>
