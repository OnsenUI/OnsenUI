<template>
  <ons-page :on-infinite-scroll.prop="infiniteScroll" v-on="unrecognizedListeners">
    <slot></slot>
  </ons-page>
</template>

<script>
  import 'onsenui/esm/elements/ons-page';
  import { deriveEvents, deriveDBB } from '../mixins';

  export default {
    name: 'v-ons-page',
    mixins: [deriveEvents, deriveDBB],

    props: {
      infiniteScroll: {
        type: Function
      }
    }
  };
</script>
