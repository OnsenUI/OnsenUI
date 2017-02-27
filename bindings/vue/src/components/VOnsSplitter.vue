<template>
  <ons-splitter>
    <slot></slot>
    <v-ons-splitter-mask :onClick="() => this.$emit('mask')"></v-ons-splitter-mask>
  </ons-splitter>
</template>

<script>
  import { deriveProperties, selfProvider } from '../mixins';

  export default {
    mixins: [deriveProperties, selfProvider]
  };
</script>
