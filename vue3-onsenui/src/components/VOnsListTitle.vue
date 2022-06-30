<template>
  <ons-list-title :modifier="normalizedModifier">
    <slot></slot>
  </ons-list-title>
</template>

<script>
  import 'onsenui/esm/elements/ons-list-title.js';
  import { deriveEvents, modifier } from '../mixins/index.js';

  const name = 'v-ons-list-title';

  export default {
    name,
    mixins: [deriveEvents(name), modifier]
  };
</script>
