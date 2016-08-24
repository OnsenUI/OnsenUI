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

    ready() {
      /**
       * Override default click behavior.
       */
      this.$el.onClick = noop;
    }
  };
</script>
