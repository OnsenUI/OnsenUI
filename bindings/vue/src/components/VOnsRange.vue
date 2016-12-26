<template>
  <ons-range
    :disabled="disabled"
    :value="value"
    :modifier="modifier">
  </ons-range>
</template>

<script>
  export default {
    props: {
      disabled: { type: Boolean },
      value:    { type: String },
      modifier: { type: String },
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

    // mounted() {
    // },

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
