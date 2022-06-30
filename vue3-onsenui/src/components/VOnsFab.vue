<template>
  <ons-fab :modifier="normalizedModifier">
    <slot></slot>
  </ons-fab>
</template>

<script>
  import 'onsenui/esm/elements/ons-fab.js';
  import { deriveEvents, hidable, modifier } from '../mixins/index.js';

  const name = 'v-ons-fab';

  export default {
    name,
    mixins: [deriveEvents(name), hidable, modifier]
  };
</script>
