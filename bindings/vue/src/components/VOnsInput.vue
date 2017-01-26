<template>
  <ons-input>
  </ons-input>
</template>

<script>
  import { deriveEvents, deriveProperties } from '../internal/mixins.js';

  export default {
    mixins: [deriveEvents, deriveProperties],
    mounted() {
      // Overwrite original 'input' or 'change' handlers for v-model support
      if (['checkbox', 'radio'].includes(this.type)) {
        // TODO v-model does not work
        this.$el.removeEventListener('change', this._onChange);
        this._onChange = event => this.$emit('change', event.target.checked);
        this.$el.addEventListener('change', this._onChange);
      } else {
        this.$el.removeEventListener('input', this._onInput);
        this._onInput = event => this.$emit('input', event.target.value);
        this.$el.addEventListener('input', this._onInput);
      }
    }
  };
</script>
