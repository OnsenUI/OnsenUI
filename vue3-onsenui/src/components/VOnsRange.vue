<template>
  <ons-range :modifier="normalizedModifier">
    <slot></slot>
  </ons-range>
</template>

<script>
  import 'onsenui/esm/elements/ons-range.js';
  import { deriveEvents, modelInputNumber, modifier } from '../mixins/index.js';

  const name = 'v-ons-range';

  export default {
    name,
    mixins: [deriveEvents(name), modelInputNumber, modifier]
  };
</script>
