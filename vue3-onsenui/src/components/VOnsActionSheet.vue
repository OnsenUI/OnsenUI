<template>
  <ons-action-sheet :modifier="normalizedModifier" v-bind="orderedProps">
    <slot></slot>
  </ons-action-sheet>
</template>

<script>
  import 'onsenui/esm/elements/ons-action-sheet.js';
  import { deriveEvents, hasOptions, dialog, deriveDBB, portal, modifier } from '../mixins/index.js';

  const name = 'v-ons-action-sheet';

  export default {
    name,
    mixins: [deriveEvents(name), hasOptions, dialog, deriveDBB, portal, modifier]
  };
</script>
