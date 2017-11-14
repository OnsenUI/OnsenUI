<template>
  <ons-tab :active="active" :on-click.prop="action">
  </ons-tab>
</template>

<script>
  import 'onsenui/esm/elements/ons-tab';

  export default {
    name: 'v-ons-tab',
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
          this.tabbar.$el.setActiveTab(this.$el.index, { reject: false, ...this.tabbar.options });
        }
      }
    },

    watch: {
      active() {
        this.$el.setActive(this.active);
      }
    }
  };
</script>
