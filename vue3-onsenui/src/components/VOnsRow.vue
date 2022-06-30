<template>
  <ons-row>
    <slot></slot>
  </ons-row>
</template>

<script>
  import 'onsenui/esm/elements/ons-row.js';
  import { deriveEvents } from '../mixins/index.js';

  const name = 'v-ons-row';

  export default {
    name,
    mixins: [deriveEvents(name)]
  };
</script>
