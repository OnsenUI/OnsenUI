<template>
  <ons-pull-hook>
    <slot></slot>
  </ons-pull-hook>
</template>

<script>
  export default {
    ready() {
      const el = this.$el;

      el.onAction = (done) => {
        this.$emit('action', done);
      };

      el.addEventListener('changestate', ({state}) => {
        this.$emit('changestate', {state});
      });
    }
  };
</script>
