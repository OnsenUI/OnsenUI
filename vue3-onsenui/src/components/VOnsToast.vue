<template>
  <ons-toast :modifier="normalizedModifier">
    <slot></slot>
  </ons-toast>
</template>

<script>
  /* This file was generated automatically by 'generate-components' task in bindings/vue/gulpfile.babel.js */
  import 'onsenui/esm/elements/ons-toast';
  import { deriveEvents, hasOptions, deriveDBB, portal, modifier } from '../mixins';

  const name = 'v-ons-toast';

  export default {
    name,
    mixins: [deriveEvents(name), hasOptions, deriveDBB, portal, modifier]
  };
</script>
