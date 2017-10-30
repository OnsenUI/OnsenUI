<template>
  <ons-toast v-on="unrecognizedListeners">
    <slot></slot>
  </ons-toast>
</template>

<script>
  import 'onsenui/esm/elements/ons-toast';
  import { deriveEvents, hidable, hasOptions, deriveDBB, portal } from '../mixins';

  export default {
    mixins: [deriveEvents, hidable, hasOptions, deriveDBB, portal]
  };
</script>