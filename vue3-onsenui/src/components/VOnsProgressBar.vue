<template>
  <ons-progress-bar :modifier="normalizedModifier">
    <slot></slot>
  </ons-progress-bar>
</template>

<script>
  import 'onsenui/esm/elements/ons-progress-bar.js';
  import { deriveEvents, modifier } from '../mixins/index.js';

  const name = 'v-ons-progress-bar';

  export default {
    name,
    mixins: [deriveEvents(name), modifier]
  };
</script>
