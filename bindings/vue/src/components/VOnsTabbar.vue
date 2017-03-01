<template>
  <ons-tabbar :activeIndex="index">
    <div class="tabbar__content">
      <slot name="pages"></slot>
    </div>
    <div class="tabbar">
      <slot></slot>
    </div>
  </ons-tabbar>
</template>

<script>
  import { deriveEvents, hasOptions, hidable, selfProvider } from '../mixins';

  export default {
    mixins: [deriveEvents, hasOptions, hidable, selfProvider],

    props: {
      index: {
        type: Number
      }
    },

    watch: {
      index() {
        if (this.index !== this.$el.getActiveTabIndex()) {
          this.$el.setActiveTab(this.index, this.options);
        }
      }
    },

    mounted() {
      this.$on('postchange', event => this.$emit('change', event.index));
    }
  };
</script>

