<template>
  <ons-bottom-toolbar :modifier="normalizedModifier">
    <slot></slot>
  </ons-bottom-toolbar>
</template>

<script>
  import 'onsenui/esm/elements/ons-bottom-toolbar.js';
  import { deriveEvents, modifier } from '../mixins/index.js';

  const name = 'v-ons-bottom-toolbar';

  export default {
    name,
    mixins: [deriveEvents(name), modifier]
  };
</script>
