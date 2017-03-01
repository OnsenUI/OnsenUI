<template>
  <ons-tab>
  </ons-tab>
</template>

<script>
  import { VueTabLoader } from '../mixins';

  export default {
    mixins: [VueTabLoader],

    inject: ['tabbar'],

    props: {
      active: {
        type: Boolean
      }
    },

    watch: {
      active() {
        this.active ? this.$el.setActive() : this.$el.setInactive();
      }
    },

    mounted() {
      this.$el.onClick = () => {
        const id = setTimeout(() => {
          this.tabbar.$el.setActiveTab(this.$el._findTabIndex(), this.tabbar.options);
        }, 0);

        this.$emit('click', {
          preventDefault: () => clearTimeout(id)
        });
      };

      if (this.active === true) {
        this.$el.setAttribute('active', '');
      }
    }
  };
</script>

