<template>
  <ons-action-sheet-button :modifier="normalizedModifier">
    <slot></slot>
  </ons-action-sheet-button>
</template>

<script>
  import 'onsenui/esm/elements/ons-action-sheet-button.js';
  import { deriveEvents, modifier } from '../mixins/index.js';

  const name = 'v-ons-action-sheet-button';

  export default {
    name,
    mixins: [deriveEvents(name), modifier]
  };
</script>
