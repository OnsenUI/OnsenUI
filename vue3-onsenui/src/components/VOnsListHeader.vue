<template>
  <ons-list-header :modifier="normalizedModifier">
    <slot></slot>
  </ons-list-header>
</template>

<script>
  import 'onsenui/esm/elements/ons-list-header.js';
  import { deriveEvents, modifier } from '../mixins/index.js';

  const name = 'v-ons-list-header';

  export default {
    name,
    mixins: [deriveEvents(name), modifier]
  };
</script>
