<template>
  <ons-select v-on="$listeners">
    <select>
      <slot></slot>
    </select>
  </ons-select>
</template>

<script>
  import { modelInput } from '../mixins';

  export default {
    mixins: [modelInput]
  };
</script>
