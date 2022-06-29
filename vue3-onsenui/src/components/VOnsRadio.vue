<template>
  <ons-radio :modifier="normalizedModifier">
    <slot></slot>
  </ons-radio>
</template>

<script>
  import 'onsenui/esm/elements/ons-radio.js';
  import { deriveEvents, modelRadio, modifier } from '../mixins/index.js';

  const name = 'v-ons-radio';

  export default {
    name,
    mixins: [deriveEvents(name), modelRadio, modifier]
  };
</script>
