<template>
  <ons-switch :modifier="normalizedModifier">
    <slot></slot>
  </ons-switch>
</template>

<script>
  import 'onsenui/esm/elements/ons-switch.js';
  import { deriveEvents, modelCheckbox, modifier } from '../mixins/index.js';

  const name = 'v-ons-switch';

  export default {
    name,
    mixins: [deriveEvents(name), modelCheckbox, modifier]
  };
</script>
