<template>
  <ons-back-button :on-click.prop="action">
    <slot></slot>
  </ons-back-button>
</template>

<script>
  export default {
    inject: ['navigator'],

    methods: {
      action() {
        const id = setTimeout(() => this.navigator.pageStack.pop(), 0);
        this.$emit('click', { preventDefault: () => clearTimeout(id) });
      }
    }
  };
</script>
