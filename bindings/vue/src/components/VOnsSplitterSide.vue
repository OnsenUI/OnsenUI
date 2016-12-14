<template>
  <ons-splitter-side
    :side="side"
    :width="width"
    :collapse="collapse ? '' : null"
    :swipeable="swipeable ? '' : null"
  >
    <slot></slot>
  </ons-splitter-side>
</template>

<script>
  export default {
    props: {
      side: {
        type: String,
        default: 'left',
        validator: (val) => (
          val == 'left' ||
          val == 'right'
        )
      },

      width: {
        type: String,
        default: '80%'
      },

      collapse: {
        type: Boolean,
        default: false
      },

      swipeable: {
        type: Boolean,
        default: false
      },

      open: {
        type: Boolean,
        default: false
      }
    },

    watch: {
      open(shouldOpen) {
        const isOpen = this.$el.isOpen;

        if (!shouldOpen && isOpen) {
          this.$el.close();
        } else if (shouldOpen && !isOpen) {
          this.$el.open();
        }
      }
    },

    mounted() {
      this.$el.addEventListener('preopen', this.onPreopen);
      this.$el.addEventListener('postopen', this.onPostopen);
      this.$el.addEventListener('preclose', this.onPreclose);
      this.$el.addEventListener('postclose', this.onPostclose);
    },

    beforeDestroy() {
      this.$el.removeEventListener('preopen', this.onPreopen);
      this.$el.removeEventListener('postopen', this.onPostopen);
      this.$el.removeEventListener('preclose', this.onPreclose);
      this.$el.removeEventListener('postclose', this.onPostclose);
    },

    methods: {
      onPreopen(ev) {
        this.$emit('preopen', ev);
      },

      onPostopen(ev) {
        this.$emit('postopen', ev);
      },

      onPreclose(ev) {
        this.$emit('preclose', ev);
      },

      onPostclose(ev) {
        this.$emit('postclose', ev);
      }
    }
  };
</script>
