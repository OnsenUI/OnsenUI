<template>
  <ons-segment :active-index="index" @postchange.self="$emit('update:index', $event.index)">
    <slot></slot>
  </ons-segment>
</template>

<script>
  import 'onsenui/esm/elements/ons-segment';
  import { deriveEvents } from '../mixins';

  export default {
    mixins: [deriveEvents],

    props: {
      index: {
        type: Number
      }
    },

    watch: {
      index() {
        if (this.index !== this.$el.getActiveButtonIndex()) {
          this.$el.setActiveButton(this.index, { reject: false });
        }
      }
    }
  };
</script>
