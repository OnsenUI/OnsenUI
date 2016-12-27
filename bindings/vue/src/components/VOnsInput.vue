<template>
  <ons-input>
    <slot></slot>
  </ons-input>
</template>
<!-- slot is required for `content-left` attribute -->

<script>
  export default {
    methods: {
      // Enable v-model directive on this component by relaying input event
      onInput(ev) {
        // Note:
        // v-model directive works differently for Vue components.
        // For more details, see: https://vuejs.org/v2/guide/components.html
        this.$emit('input', ev.target.value);
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
      this.$el.addEventListener('input', this.onInput);
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
      this.$el.removeEventListener('input', this.onInput);
    },

    // destroyed() {
    // },
  };
</script>
