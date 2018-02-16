<template>
  <ons-page
    :on-infinite-scroll.prop="infiniteScroll"
    :modifier="normalizedModifier"
    v-on="unrecognizedListeners"
  >
    <slot></slot>
  </ons-page>
</template>

<script>
  import 'onsenui/esm/elements/ons-page';
  import { deriveEvents, deriveDBB, modifier } from '../mixins';

  export default {
    name: 'v-ons-page',
    mixins: [deriveEvents, deriveDBB, modifier],

    props: {
      infiniteScroll: {
        type: Function
      }
    }
  };
</script>
