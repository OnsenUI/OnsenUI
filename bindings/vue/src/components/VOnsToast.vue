<template>
  <ons-toast v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-toast>
</template>

<script>
  /* This file is generated automatically */
  import 'onsenui/esm/elements/ons-toast';
  import { deriveEvents, hidable, hasOptions, deriveDBB, portal, modifier } from '../mixins';

  export default {
    name: 'v-ons-toast',
    mixins: [deriveEvents, hidable, hasOptions, deriveDBB, portal, modifier]
  };
</script>