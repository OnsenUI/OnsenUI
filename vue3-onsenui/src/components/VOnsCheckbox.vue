<template>
  <ons-checkbox :modifier="normalizedModifier">
    <slot></slot>
  </ons-checkbox>
</template>

<script>
  import 'onsenui/esm/elements/ons-checkbox.js';
  import { deriveEvents, modelCheckbox, modifier } from '../mixins/index.js';

  const name = 'v-ons-checkbox';

  export default {
    name,
    mixins: [deriveEvents(name), modelCheckbox, modifier]
  };
</script>
