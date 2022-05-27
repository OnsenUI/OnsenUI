<template>
  <ons-speed-dial v-on="unrecognizedListeners">
    <slot></slot>
  </ons-speed-dial>
</template>

<script>
  import 'onsenui/esm/elements/ons-speed-dial';
  import { hidable, deriveEvents } from '../mixins';

  export default {
    name: 'v-ons-speed-dial',
    mixins: [deriveEvents, hidable],

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
      this.$on(['open', 'close'], () => this._shouldUpdate() && this.$emit('update:open', this.$el.isOpen()));

      this._updateToggle();
    }
  };
</script>
