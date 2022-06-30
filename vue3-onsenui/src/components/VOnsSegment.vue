<template>
  <ons-segment @postchange.self="$emit('update:activeIndex', $event.index)">
    <slot></slot>
  </ons-segment>
</template>

<script>
  import 'onsenui/esm/elements/ons-segment.js';
  import { deriveEvents } from '../mixins/index.js';

  const name = 'v-ons-segment';

  export default {
    name,
    mixins: [deriveEvents(name)],
    emits: ['update:activeIndex'],
  };
</script>
