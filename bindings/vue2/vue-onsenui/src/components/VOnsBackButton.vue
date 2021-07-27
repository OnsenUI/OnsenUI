<template>
  <ons-back-button :on-click.prop="action">
    <slot></slot>
  </ons-back-button>
</template>

<script>
  import 'onsenui/esm/elements/ons-back-button';
  import { modifier } from '../mixins';

  export default {
    name: 'v-ons-back-button',
    inject: ['navigator'],
    mixins: [modifier],

    methods: {
      action() {
        let runDefault = true;
        this.$emit('click', { preventDefault: () => runDefault = false });

        if (runDefault && this.navigator.pageStack.length > 1) {
          this.navigator.popPage();
        }
      }
    }
  };
</script>
