<template>
  <ons-toolbar-button v-on="unrecognizedListeners" :modifier="normalizedModifier">
    <slot></slot>
  </ons-toolbar-button>
</template>

<script>
  /* This file is generated automatically */
  import 'onsenui/esm/elements/ons-toolbar-button';
  import { deriveEvents, modifier } from '../mixins';

  export default {
    name: 'v-ons-toolbar-button',
    mixins: [deriveEvents, modifier]
  };
</script>