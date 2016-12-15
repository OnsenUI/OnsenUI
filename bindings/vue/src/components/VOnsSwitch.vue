<template>
  <ons-switch v-bind:checked="checked"></ons-switch>
</template>

<script>
  export default {
    props: {
      checked: { model: Boolean }
    },

    methods: {
      onChange(ev) {
        this.$emit('change', ev);
      }
    },

    //--------------------------------
    // lifecycle hooks
    //--------------------------------

    // beforeCreate() {
    // },

    // created() {
    // },

    // beforeMount() {
    // },

    mounted() {
      this.$el.addEventListener('change', this.onChange);
    },

    // beforeUpdate() {
    // },

    // updated() {
    // },

    // activated() {
    // },

    // deactivated() {
    // },

    beforeDestroy() {
      this.$el.removeEventListener('change', this.onChange);
    },

    // destroyed() {
    // },
  };
</script>
