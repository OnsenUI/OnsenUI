<template>
  <ons-switch v-bind:checked="checked"></ons-switch>
</template>

<script>
  export default {
    mounted() {
      this.$el.addEventListener('change', this.onChange);
    },

    beforeDestroy() {
      this.$el.removeEventListener('change', this.onChange);
    },

    props: {
      checked: {
        model: Boolean
      }
    },

    methods: {
      onChange(ev) {
        this.$emit('change', ev);
      }
    }
  };
</script>
