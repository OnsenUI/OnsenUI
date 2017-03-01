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

    methods: {
      _action() {
        if (this.navigator && this.navigator.pageStack) {
          this.navigator.pageStack.pop();
        }
      }
    },

    mounted() {
      this.$el.onClick = () => {
        const id = setTimeout(() => this._action(), 0);
        this.$emit('click', {
          preventDefault: () => clearTimeout(id)
        });
      };
    }
  };
</script>
