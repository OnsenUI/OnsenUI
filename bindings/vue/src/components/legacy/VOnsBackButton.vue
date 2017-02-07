<template>
  <ons-back-button class="back-button">
    {{ label }}
  </ons-back-button>
</template>

<script>
  const noop = () => {};

  export default {
    props: {
      label: {
        type: String,
        default: 'Back'
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
      /**
       * Override default click behavior.
       */
       this.$nextTick(function() {
           this.$el.onClick = noop;
       });
    },

    // beforeUpdate() {
    // },

    // updated() {
    // },

    // activated() {
    // },

    // deactivated() {
    // },

    // beforeDestroy() {
    // },

    // destroyed() {
    // },
  };
</script>
