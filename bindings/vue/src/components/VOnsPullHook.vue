<template>
  <ons-pull-hook>
    <slot></slot>
  </ons-pull-hook>
</template>

<script>
  import { deriveEvents, deriveMethods, deriveProperties } from '../internal/mixins/derive';

  export default {
    mixins: [deriveEvents, deriveMethods, deriveProperties],

    mounted() {
      this.$el.removeEventListener('changestate', this._onChangestate);
      this._onChangestate = (event) => {
        this.$emit('input', event.state);
        this.$emit('changestate', event);
      };

      this.$el.addEventListener('changestate', this._onChangestate);
      this.$el.onAction = done => this.$emit('action', done);
    }
  };
</script>
