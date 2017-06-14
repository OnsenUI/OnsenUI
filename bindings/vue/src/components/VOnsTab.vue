<template>
  <ons-tab :active="active" :on-click.prop="action">
  </ons-tab>
</template>

<script>
  export default {
    inject: ['tabbar'],

    props: {
      page: { },
      props: { },
      active: {
        type: Boolean
      }
    },

    methods: {
      action() {
        let runDefault = true;
        this.$emit('click', { preventDefault: () => runDefault = false });

        if (runDefault) {
          this.tabbar.$el.setActiveTab(this.$el._findTabIndex(), this.tabbar.options);
        }
      }
    },

    watch: {
      active() {
        this.active ? this.$el.setActive() : this.$el.setInactive();
      }
    }
  };
</script>
