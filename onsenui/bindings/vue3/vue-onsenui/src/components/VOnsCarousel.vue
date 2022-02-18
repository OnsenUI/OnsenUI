<template>
  <ons-carousel
    :initial-index="index"
    @postchange.self="$emit('update:index', $event.activeIndex)"
  >
    <div>
      <slot></slot>
    </div>
    <div></div>
  </ons-carousel>
</template>

<script>
  import 'onsenui/esm/elements/ons-carousel';
  import { hasOptions, deriveEvents } from '../mixins';

  const name = 'v-ons-carousel';

  export default {
    name,
    mixins: [hasOptions, deriveEvents(name)],

    props: {
      index: {
        type: Number
      }
    },
    emits: ['update:index'],

    watch: {
      index() {
        if (this.index !== this.$el.getActiveIndex()) {
          this.$el.setActiveIndex(this.index, this.options);
        }
      }
    }
  };
</script>
