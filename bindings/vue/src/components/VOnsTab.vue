<template>
  <ons-tab>
  </ons-tab>
</template>

<script>
  import { VueTabLoader, clickable } from '../mixins';

  export default {
    mixins: [VueTabLoader, clickable],

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

