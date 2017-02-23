<template>
  <ons-tab>
  </ons-tab>
</template>

<script>
  import { VueTabLoader, clickable, deriveMethods } from '../mixins';

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

