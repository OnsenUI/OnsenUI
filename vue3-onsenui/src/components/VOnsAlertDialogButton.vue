<template>
  <ons-alert-dialog-button :modifier="normalizedModifier">
    <slot></slot>
  </ons-alert-dialog-button>
</template>

<script>
  import 'onsenui/esm/elements/ons-alert-dialog-button.js';
  import { deriveEvents, modifier } from '../mixins/index.js';

  const name = 'v-ons-alert-dialog-button';

  export default {
    name,
    mixins: [deriveEvents(name), modifier]
  };
</script>
