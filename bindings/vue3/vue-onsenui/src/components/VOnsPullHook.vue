<template>
  <ons-pull-hook>
    <slot></slot>
  </ons-pull-hook>
</template>

<script>
  import 'onsenui/esm/elements/ons-pull-hook';
  import { deriveEvents } from '../mixins';

  const name = 'v-ons-pull-hook';

  export default {
    name,
    mixins: [deriveEvents(name)],

    props: {
      action: {
        type: Function
      }
    },

    mounted() {
      this.$el.onAction = this.action;
    },

    watch: {
      action() {
        if (this.action !== this.$el.onAction) {
          this.$el.onAction = this.action;
        }
      }
    }
  };
</script>
