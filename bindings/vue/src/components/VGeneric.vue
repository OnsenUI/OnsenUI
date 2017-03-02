<template>
  <div :is="$options._componentTag.slice(2)" @click="$emit('click', $event)">
    <slot></slot>
  </div>
</template>

<script>
  import { modifier, deriveEvents } from '../mixins';
  export default {
    mixins: [modifier, deriveEvents]
  };
</script>
