<template>
  <ons-modal :modifier="normalizedModifier">
    <slot></slot>
  </ons-modal>
</template>

<script>
  import 'onsenui/esm/elements/ons-modal.js';
  import { deriveEvents, hidable, hasOptions, deriveDBB, portal, modifier } from '../mixins/index.js';

  const name = 'v-ons-modal';

  export default {
    name,
    mixins: [deriveEvents(name), hidable, hasOptions, deriveDBB, portal, modifier]
  };
</script>
