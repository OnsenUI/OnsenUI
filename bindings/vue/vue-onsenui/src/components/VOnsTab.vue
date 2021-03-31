<template>
  <ons-tab :active="coercedActive" :on-click.prop="action">
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
    emits: ['click'],

    methods: {
      action() {
        let runDefault = true;
        this.$emit('click', { preventDefault: () => runDefault = false });

        if (runDefault) {
          this.tabbar.$el.setActiveTab(this.$el.index, { reject: false, ...this.tabbar.options });
        }
      }
    },

    computed: {
      coercedActive() {
        // Returns null if active prop is false so the native ons-tab's active
        // attribute will not be set. Without this, ons-tab's active attribute
        // would be active="false" (i.e. set).
        return this.active || null;
      }
    },

    watch: {
      active() {
        this.$el.setActive(this.active);
      }
    }
  };
</script>
