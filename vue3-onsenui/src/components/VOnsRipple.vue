<template>
  <ons-ripple>
    <slot></slot>
  </ons-ripple>
</template>

<script>
  import 'onsenui/esm/elements/ons-ripple.js';
  import { deriveEvents } from '../mixins/index.js';

  const name = 'v-ons-ripple';

  export default {
    name,
    mixins: [deriveEvents(name)]
  };
</script>
