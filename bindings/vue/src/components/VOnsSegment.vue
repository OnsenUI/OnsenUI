<template>
  <ons-segment :active-index="index" @postchange.self="$emit('update:index', $event.index)">
    <slot></slot>
  </ons-segment>
</template>

<script>
  import { hasOptions, deriveEvents } from '../mixins';

  export default {
    mixins: [hasOptions, deriveEvents],

    props: {
      index: {
        type: Number
      }
    },

    watch: {
      index() {
        if (this.index !== this.$el.getActiveButtonIndex()) {
          this.$el.setActiveButton(this.index, this.options);
        }
      }
    }
  };
</script>
