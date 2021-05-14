<template>
  <ons-dialog v-bind="unrecognizedAttributes" :modifier="normalizedModifier">
    <slot></slot>
  </ons-dialog>
</template>

<script>
  import 'onsenui/esm/elements/ons-dialog';
  import { deriveEvents, hidable, hasOptions, dialogCancel, deriveDBB, portal, modifier } from '../mixins';

  const name = 'v-ons-dialog';

  export default {
    name,
    inheritAttrs: false,
    mixins: [deriveEvents(name, ['dialog-cancel']), hidable, hasOptions, dialogCancel, deriveDBB, portal, modifier]
  };
</script>
