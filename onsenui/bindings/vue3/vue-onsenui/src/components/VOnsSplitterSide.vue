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
      this._updateOpenHandler = () => this._shouldUpdate() && this.$emit('update:open', this.$el.isOpen);

      ['postopen', 'postclose', 'modechange']
        .forEach(event => this.$el.addEventListener(event, this._updateOpenHandler));

      this.action();
    },

    beforeDestroy() {
      ['postopen', 'postclose', 'modechange']
        .forEach(event => this.$el.removeEventListener(event, this._updateOpenHandler));
    }
  };
</script>
