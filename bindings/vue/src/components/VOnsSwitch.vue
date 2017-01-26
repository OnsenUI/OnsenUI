<template>
  <ons-switch></ons-switch>
</template>

<script>
  import { deriveEvents, deriveProperties } from '../internal/mixins.js';

  export default {
    mixins: [deriveEvents, deriveProperties]
  };
</script>
