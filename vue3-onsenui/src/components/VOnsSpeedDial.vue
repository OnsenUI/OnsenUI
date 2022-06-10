<template>
  <ons-speed-dial>
    <slot></slot>
  </ons-speed-dial>
</template>

<script>
  import 'onsenui/esm/elements/ons-speed-dial.js';
  import { hidable, deriveEvents } from '../mixins/index.js';

  const name = 'v-ons-speed-dial';

  export default {
    name,
    mixins: [deriveEvents(name), hidable],

    emits: ['update:open'],

    props: {
      open: {
        type: Boolean,
        default: undefined
      }
    },

    methods: {
      _shouldUpdate() {
        return this.open !== undefined && this.open !== this.$el.isOpen();
      },
      _updateToggle() {
        this._shouldUpdate() && this.$el[this.open ? 'showItems' : 'hideItems'].call(this.$el);
      }
    },

    watch: {
      open() {
        this._updateToggle();
      }
    },

    mounted() {
      this._updateOpenHandler = () => this._shouldUpdate() && this.$emit('update:open', this.$el.isOpen());

      ['open', 'close'].forEach(event => this.$el.addEventListener(event, this._updateOpenHandler));

      this._updateToggle();
    },

    beforeDestroy() {
      ['open', 'close'].forEach(event => this.$el.removeEventListener(event, this._updateOpenHandler));
    }
  };
</script>
