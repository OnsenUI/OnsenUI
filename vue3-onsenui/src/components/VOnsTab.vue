<template>
  <ons-tab :active="active || null" @click.prevent="action">
  </ons-tab>
</template>

<script>
  import 'onsenui/esm/elements/ons-tab.js';

  export default {
    name: 'v-ons-tab',
    inject: ['tabbar'],
    emits: ['click'],

    props: {
      page: { },
      props: { },
      active: {
        type: Boolean
      }
    },

    methods: {
      action(event) {
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
