<template>
  <ons-carousel>
    <slot></slot>
  </ons-carousel>
</template>

<script>
  import ons from 'onsenui';

  import {createComputedPropertiesFor, createMethodsFor} from '../common/optionsObjectHelper.js';

  export default {
    computed: createComputedPropertiesFor(ons.CarouselElement),

    methods: Object.assign(
      createMethodsFor(ons.CarouselElement),
      {
        onPostChange(ev) {
          this.$emit('postchange', ev);
        },
        onRefresh(ev) {
          this.$emit('refresh', ev);
        },
        onOverScroll(ev) {
          this.$emit('overscroll', ev);
        }
      }
    ),

    //--------------------------------
    // lifecycle hooks
    //--------------------------------

    // beforeCreate() {
    // },

    // created() {
    // },

    // beforeMount() {
    // },

    mounted() {
      this.$el.addEventListener('postchange', this.onPostChange);
      this.$el.addEventListener('refresh', this.onRefresh);
      this.$el.addEventListener('overscroll', this.onOverScroll);
    },

    // beforeUpdate() {
    // },

    // updated() {
    // },

    // activated() {
    // },

    // deactivated() {
    // },

    beforeDestroy() {
      this.$el.removeEventListener('postchange', this.onPostChange);
      this.$el.removeEventListener('refresh', this.onRefresh);
      this.$el.removeEventListener('overscroll', this.onOverScroll);
    },

    // destroyed() {
    // },
  };
</script>
