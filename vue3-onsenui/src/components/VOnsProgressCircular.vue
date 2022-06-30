<template>
  <ons-progress-circular :modifier="normalizedModifier">
    <slot></slot>
  </ons-progress-circular>
</template>

<script>
  import 'onsenui/esm/elements/ons-progress-circular.js';
  import { deriveEvents, modifier } from '../mixins/index.js';

  const name = 'v-ons-progress-circular';

  export default {
    name,
    mixins: [deriveEvents(name), modifier]
  };
</script>
