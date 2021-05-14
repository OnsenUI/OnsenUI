<template>
  <ons-splitter-side>
    <slot></slot>
  </ons-splitter-side>
</template>

<script>
  import 'onsenui/esm/elements/ons-splitter-side';
  import { hasOptions, deriveEvents } from '../mixins';

  const name = 'v-ons-splitter-side';

  export default {
    name,
    mixins: [hasOptions, deriveEvents(name)],

    emits: ['update:open'],
    props: {
      open: {
        type: Boolean,
        default: undefined
      }
    },

    data() {
      return {
        handlers: {
          postopen: this.userInteraction,
          postclose: this.userInteraction,
          modechange: this.userInteraction
        }
      }
    },

    methods: {
      action() {
        this._shouldUpdate() && this.$el[this.open ? 'open' : 'close'].call(this.$el, this.options).catch(() => {});
      },
      _shouldUpdate() {
        return this.open !== undefined && this.open !== this.$el.isOpen;
      }
    },

    watch: {
      open() {
        this.action();
      }
    },

    mounted() {
      this._userInteraction = e =>
        this._shouldUpdate() && this.$emit('update:open', this.$el.isOpen);
      ['postopen', 'postclose', 'modechange'].forEach(e => this.$el.addEventListener(e, this._userInteraction));

      this.action();
    },

    beforeUnmount() {
      ['postopen', 'postclose', 'modechange'].forEach(e => this.$el.removeEventListener(e, this._userInteraction));
    }
  };
</script>
