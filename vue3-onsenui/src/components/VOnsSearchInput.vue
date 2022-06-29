<template>
  <ons-search-input :modifier="normalizedModifier">
    <slot></slot>
  </ons-search-input>
</template>

<script>
  import 'onsenui/esm/elements/ons-search-input.js';
  import { deriveEvents, modelInput, modifier } from '../mixins/index.js';

  const name = 'v-ons-search-input';

  export default {
    name,
    mixins: [deriveEvents(name), modelInput, modifier]
  };
</script>
