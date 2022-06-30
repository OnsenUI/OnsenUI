<template>
  <ons-input :modifier="normalizedModifier">
    <slot></slot>
  </ons-input>
</template>

<script>
  import 'onsenui/esm/elements/ons-input.js';
  import { deriveEvents, modelInput, modifier } from '../mixins/index.js';

  const name = 'v-ons-input';

  export default {
    name,
    mixins: [deriveEvents(name), modelInput, modifier]
  };
</script>
