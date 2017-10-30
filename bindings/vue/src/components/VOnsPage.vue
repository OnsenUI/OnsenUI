<template>
  <ons-page :on-infinite-scroll.prop="infiniteScroll" v-on="unrecognizedListeners">
    <slot></slot>
  </ons-page>
</template>

<script>
  import 'onsenui/core-src/elements/ons-page';
  import { deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents],

    props: {
      infiniteScroll: {
        type: Function
      }
    }
  };
</script>
