<template>
  <ons-icon :modifier="normalizedModifier">
    <slot></slot>
  </ons-icon>
</template>

<script>
  import 'onsenui/esm/elements/ons-icon.js';
  import { deriveEvents, modifier } from '../mixins/index.js';

  const name = 'v-ons-icon';

  export default {
    name,
    mixins: [deriveEvents(name), modifier]
  };
</script>
