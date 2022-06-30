<template>
  <ons-toolbar :modifier="normalizedModifier" :inline="inline || null">
    <slot></slot>
  </ons-toolbar>
</template>

<script>
  import 'onsenui/esm/elements/ons-toolbar.js';
  import { deriveEvents, modifier } from '../mixins/index.js';

  const name = 'v-ons-toolbar';

  export default {
    name,
    mixins: [deriveEvents(name), modifier],
    props: {
      inline: Boolean
    }
  };
</script>
