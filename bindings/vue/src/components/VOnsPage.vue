<template>
  <ons-page :on-infinite-scroll.prop="infiniteScroll" v-on="unrecognizedListeners">
    <slot></slot>
  </ons-page>
</template>

<script>
  import 'onsenui/esm/elements/ons-page';
  import { deriveEvents } from '../mixins';

  export default {
    name: 'v-ons-page',
    mixins: [deriveEvents],

    props: {
      infiniteScroll: {
        type: Function
      }
    }
  };
</script>
