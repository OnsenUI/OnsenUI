<template>
  <ons-carousel-item>
    <slot></slot>
  </ons-carousel-item>
</template>

<script>
  import 'onsenui/esm/elements/ons-carousel-item.js';
  import { deriveEvents } from '../mixins/index.js';

  const name = 'v-ons-carousel-item';

  export default {
    name,
    mixins: [deriveEvents(name)]
  };
</script>
