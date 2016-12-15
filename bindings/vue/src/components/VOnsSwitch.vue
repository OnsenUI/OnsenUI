<template>
  <ons-switch
    v-bind:checked="checked"
    v-bind:disabled="disabled"
    v-bind:input-id="inputId"
    v-bind:modifier="modifier">
  </ons-switch>
</template>

<script>
  export default {
    props: {
      checked:  { type: Boolean },
      disabled: { type: Boolean },
      inputId:  { type: String },
      modifier: { type: String },
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
