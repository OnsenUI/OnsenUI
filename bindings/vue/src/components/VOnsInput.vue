<template>
  <ons-input>
  </ons-input>
</template>

<script>
  import { deriveEvents, deriveProperties } from '../internal/mixins/derive';

  export default {
    mounted() {
      this.$el.removeEventListener('change', this._onChange);
      this.$el.removeEventListener('input', this._onInput);

      if (['checkbox', 'radio'].includes(this.$el.type)) {
        this._onChange = event => {
          this.$emit('change', event);
        };
        this.$el.addEventListener('change', this._onChange);

      } else {
        this._onInput = event => this.$emit('input', event.target.value);
        this.$el.addEventListener('input', this._onInput);
      }
    }
  };
</script>
