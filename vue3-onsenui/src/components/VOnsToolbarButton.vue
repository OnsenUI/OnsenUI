<template>
  <ons-toolbar-button :modifier="normalizedModifier">
    <slot></slot>
  </ons-toolbar-button>
</template>

<script>
  import 'onsenui/esm/elements/ons-toolbar-button.js';
  import { deriveEvents, modifier } from '../mixins/index.js';

  const name = 'v-ons-toolbar-button';

  export default {
    name,
    mixins: [deriveEvents(name), modifier]
  };
</script>
