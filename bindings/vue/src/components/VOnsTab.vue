<template>
  <ons-tab :active="active" :on-click.prop="action">
  </ons-tab>
</template>

<script>
  export default {
    inject: ['tabbar'],

    props: {
      page: { },
      active: {
        type: Boolean
      }
    },

    methods: {
      action() {
        const id = setTimeout(() => {
          this.tabbar.$el.setActiveTab(this.$el._findTabIndex(), this.tabbar.options);
        }, 0);

        this.$emit('click', { preventDefault: () => clearTimeout(id) });
      }
    },

    watch: {
      active() {
        this.active ? this.$el.setActive() : this.$el.setInactive();
      }
    }
  };
</script>
