<template>
  <ons-back-button>
    <slot></slot>
  </ons-back-button>
</template>

<script>
  import { hasOptions } from '../mixins';

  export default {
    mixins: [hasOptions],

    inject: ['navigator'],

    mounted() {
      this.$el.onClick = () => {
        const id = setTimeout(() => {
          this.navigator.pageStack.pop();
        }, 0);

        this.$emit('click', {
          preventDefault: () => clearTimeout(id)
        });
      };
    }
  };
</script>
