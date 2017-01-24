<template>
  <ons-carousel :initial-index="index">
    <slot></slot>
  </ons-carousel>
</template>

<script>
  import { deriveEvents, deriveMethods, deriveProperties } from '../internal/mixins/derive';
  import { hasOptions } from '../internal/mixins/common';

  export default {
    mixins: [deriveEvents, deriveMethods, deriveProperties, hasOptions],

    computed: {
      index: {
        cache: false,
        get() {
          return this.$vnode.data.domProps && this.$vnode.data.domProps.value || null;
        }
      }
    },

    beforeMount() {
      this.$on('postchange', event => this.$emit('input', event.activeIndex));
    },

    updated() {
      if (this.index !== this.$el.getActiveIndex()) {
        this.$el.setActiveIndex(this.index, this.options);
      }
    }
  };
</script>
