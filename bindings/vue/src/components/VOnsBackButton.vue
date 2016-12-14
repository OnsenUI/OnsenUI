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

    mounted: function () {
      /**
       * Override default click behavior.
       */
       this.$nextTick(function() {
           this.$el.onClick = noop;
       });
    }
  };
</script>
