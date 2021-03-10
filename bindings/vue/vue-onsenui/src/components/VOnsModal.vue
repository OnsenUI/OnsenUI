<template>
  <ons-modal :modifier="normalizedModifier">
    <slot></slot>
  </ons-modal>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-modal';
  import { deriveEvents, hidable, hasOptions, deriveDBB, portal, modifier } from '../mixins';

  const name = 'v-ons-modal';

  export default {
    name,
    mixins: [deriveEvents(name), hidable, hasOptions, deriveDBB, portal, modifier]
  };
</script>