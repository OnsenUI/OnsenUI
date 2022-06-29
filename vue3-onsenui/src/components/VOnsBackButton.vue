<template>
  <ons-back-button :modifier="normalizedModifier">
    <slot></slot>
  </ons-back-button>
</template>

<script>
  import 'onsenui/esm/elements/ons-back-button.js';
  import { modifier } from '../mixins/index.js';

  export default {
    name: 'v-ons-back-button',
    inject: ['navigator'],
    mixins: [modifier]
  };
</script>
