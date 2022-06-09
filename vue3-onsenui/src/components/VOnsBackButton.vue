<template>
  <ons-back-button>
    <slot></slot>
  </ons-back-button>
</template>

<script>
  import 'onsenui/esm/elements/ons-back-button';
  import { modifier } from '../mixins';

  export default {
    name: 'v-ons-back-button',
    inject: ['navigator'],
    mixins: [modifier]
  };
</script>
