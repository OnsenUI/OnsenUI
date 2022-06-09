<template>
  <ons-page
    :onInfiniteScroll.prop="infiniteScroll"
    :modifier="normalizedModifier"
  >
    <slot></slot>
  </ons-page>
</template>

<script>
  import 'onsenui/esm/elements/ons-page';
  import { deriveEvents, deriveDBB, modifier } from '../mixins';

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
