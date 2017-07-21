<template>
  <ons-select v-on="$listeners">
    <select>
      <slot></slot>
    </select>
  </ons-select>
</template>

<script>
  import { modifier, modelInput } from '../mixins';

  export default {
    mixins: [modifier, modelInput]
  };
</script>
