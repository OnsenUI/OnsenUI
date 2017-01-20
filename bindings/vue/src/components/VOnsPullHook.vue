<template>
  <ons-pull-hook>
    <slot></slot>
  </ons-pull-hook>
</template>

<script>
  import { deriveMethods, deriveProperties } from '../internal/mixins/derive';

  export default {
    mixins: [deriveMethods, deriveProperties],

    mounted() {
      this._onChangestate = (event) => {
        this.$emit('input', event.state);
        this.$emit('changestate', event);
      };

      this.$el.addEventListener('changestate', this._onChangestate);
      this.$el.onAction = done => this.$emit('action', done);
    },

    beforeDestroy() {
      this.$el.removeEventListener('changestate', this._onChangestate);
    }
  };
</script>
