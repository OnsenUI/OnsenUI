<template>
  <ons-dialog :modifier="normalizedModifier">
    <slot></slot>
  </ons-dialog>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-dialog';
  import { deriveEvents, hasOptions, dialogCancel, deriveDBB, portal, modifier } from '../mixins';

  const name = 'v-ons-dialog';

  export default {
    name,
    mixins: [deriveEvents(name), hasOptions, dialogCancel, deriveDBB, portal, modifier]
  };
</script>
