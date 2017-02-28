<template>
  <ons-back-button>
    <slot></slot>
  </ons-back-button>
</template>

<script>
  import { hasOptions, deriveProperties } from '../mixins';

  export default {
    mixins: [hasOptions, deriveProperties],

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
        const _id = setTimeout(() => this._action(), 0);
        this.$emit('click', {
          preventDefault: () => clearTimeout(_id)
        });
      };
    }
  };
</script>
