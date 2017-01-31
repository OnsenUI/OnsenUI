<template>
  <ons-tab>
  </ons-tab>
</template>

<script>
  import { deriveMethods } from '../internal/mixins/derive';
  import { VueTabLoader } from '../internal/mixins/pageLoader';
  import { clickable } from '../internal/mixins/common';

  export default {
    mixins: [deriveMethods, VueTabLoader, clickable],

    props: {
      active: {
        type: Boolean
      }
    },

    watch: {
      active() {
        if (this.active === true) {
          this.$el.setActive();
        } else {
          this.$el.setInactive();
        }
      }
    },

    mounted() {
      if (this.active === true) {
        this.$el.setAttribute('active', '');
      }
    }
  };
</script>

