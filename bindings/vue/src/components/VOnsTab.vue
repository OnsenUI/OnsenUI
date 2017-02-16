<template>
  <ons-tab>
  </ons-tab>
</template>

<script>
  import { deriveMethods } from '../mixins/derive';
  import { VueTabLoader } from '../mixins/pageLoader';
  import { clickable } from '../mixins/common';

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

