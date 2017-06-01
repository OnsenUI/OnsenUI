<template>
  <ons-select>
    <select>
      <slot></slot>
    </select>
  </ons-select>
</template>

<script>
  import { modifier, deriveEvents, modelInput } from '../mixins';

  export default {
    mixins: [modifier, deriveEvents, modelInput]
  };
</script>
