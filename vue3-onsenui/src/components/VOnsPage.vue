<template>
  <ons-page
    :onInfiniteScroll.prop="infiniteScroll"
    :modifier="normalizedModifier"
  >
    <slot></slot>
  </ons-page>
</template>

<script>
  import 'onsenui/esm/elements/ons-page.js';
  import { deriveEvents, deriveDBB, modifier } from '../mixins/index.js';

  const name = 'v-ons-page';

  export default {
    name,
    mixins: [deriveEvents(name), deriveDBB, modifier],

    props: {
      infiniteScroll: {
        type: Function
      }
    }
  };
</script>
