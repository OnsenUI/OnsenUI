<template>
  <ons-range>
    <slot></slot>
  </ons-range>
</template>

<script>
  import { deriveProperties } from '../internal/mixins/derive';

  export default {
    mixins: [deriveProperties],

    mounted() {
      this._onInput = (event) => {
        this.$emit('input', event);
      };
      this.$el.addEventListener('input', this._onInput);
    },

    beforeDestroy() {
      this.$el.removeEventListener('input', this._onInput);
    }
  };
</script>