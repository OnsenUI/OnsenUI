<template>
  <div :is="$options._componentTag.slice(2)">
    <slot></slot>
  </div>
</template>

<script>
  import { modifier, deriveEvents, deriveMethods, deriveProperties } from '../mixins';
  export default {
    mixins: [modifier, deriveEvents, deriveMethods, deriveProperties]
  };
</script>
