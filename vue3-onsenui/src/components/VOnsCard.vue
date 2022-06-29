<template>
  <ons-card :modifier="normalizedModifier">
    <slot></slot>
  </ons-card>
</template>

<script>
  import 'onsenui/esm/elements/ons-card.js';
  import { deriveEvents, modifier } from '../mixins/index.js';

  const name = 'v-ons-card';

  export default {
    name,
    mixins: [deriveEvents(name), modifier]
  };
</script>
