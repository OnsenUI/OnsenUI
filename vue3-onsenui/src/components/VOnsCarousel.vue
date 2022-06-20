<template>
  <ons-carousel
    @postchange.self="$emit('update:activeIndex', $event.activeIndex)"
  >
    <div>
      <slot></slot>
    </div>
    <div></div>
  </ons-carousel>
</template>

<script>
  import 'onsenui/esm/elements/ons-carousel.js';
  import { hasOptions, deriveEvents } from '../mixins/index.js';

  const name = 'v-ons-carousel';

  export default {
    name,
    mixins: [hasOptions, deriveEvents(name)],
    emits: ['update:activeIndex'],
  };
</script>
