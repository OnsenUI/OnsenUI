<template>
  <ons-list :modifier="normalizedModifier">
    <slot></slot>
  </ons-list>
</template>

<script>
  import 'onsenui/esm/elements/ons-list.js';
  import { deriveEvents, modifier } from '../mixins/index.js';

  const name = 'v-ons-list';

  export default {
    name,
    mixins: [deriveEvents(name), modifier]
  };
</script>
