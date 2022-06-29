<template>
  <ons-button :modifier="normalizedModifier">
    <slot></slot>
  </ons-button>
</template>

<script>
  import 'onsenui/esm/elements/ons-button.js';
  import { deriveEvents, modifier } from '../mixins/index.js';

  const name = 'v-ons-button';

  export default {
    name,
    mixins: [deriveEvents(name), modifier]
  };
</script>
