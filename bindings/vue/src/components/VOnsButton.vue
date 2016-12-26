<template>
  <ons-button
    :disabled="disabled"
    :ripple="ripple"
    :modifier="modifier">
    <slot></slot>
  </ons-button>
</template>

<script>
  export default {
    props: {
      disabled: { type: Boolean },
      ripple:   { type: Boolean },
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
