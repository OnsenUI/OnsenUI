<template>
  <component :is="$options._componentTag.slice(2)" v-on="unrecognizedListeners">
    <slot></slot>
  </component>
</template>

<script>
  import { deriveEvents } from '../mixins';
  export default {
    mixins: [deriveEvents]
  };
</script>
